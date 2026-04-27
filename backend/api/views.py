from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Sum, Avg, Count, Q, F
from django.contrib.auth.models import User
from decimal import Decimal
from .models import (
    Vehicle, VehicleExpense, Customer, Employee, Sale,
    Expense, Document, Location, DealershipSettings, AuditLog
)
from .serializers import (
    VehicleSerializer, VehicleExpenseSerializer, CustomerSerializer,
    EmployeeSerializer, SaleSerializer, ExpenseSerializer,
    DocumentSerializer, LocationSerializer, DealershipSettingsSerializer,
    AuditLogSerializer,
)


def log_action(action, detail, user="System"):
    AuditLog.objects.create(action=action, detail=detail, user=user)


# ═══════ Dashboard ═══════
@api_view(['GET'])
def dashboard(request):
    vehicles = Vehicle.objects.all()
    sold = vehicles.filter(status='Sold')
    in_stock = vehicles.filter(status='In Stock')
    sales = Sale.objects.all()

    total_revenue = sales.aggregate(t=Sum('sale_price'))['t'] or 0
    total_cost = sum(float(s.vehicle.cost) for s in sales if s.vehicle)
    total_profit = float(total_revenue) - total_cost

    inv_value = in_stock.aggregate(t=Sum('price'))['t'] or 0
    avg_days = vehicles.exclude(status='Sold').aggregate(a=Avg('days_on_lot'))['a'] or 0
    total_expenses = Expense.objects.aggregate(t=Sum('amount'))['t'] or 0

    customers = Customer.objects.all()
    active_leads = customers.filter(stage__in=['Lead', 'Contacted', 'Negotiating']).count()
    closed_won = customers.filter(stage='Closed Won').count()
    conv_rate = (closed_won / customers.count() * 100) if customers.count() > 0 else 0

    # Recent sales
    recent_sales = SaleSerializer(sales[:5], many=True).data

    # Aging stock
    aging = VehicleSerializer(
        vehicles.exclude(status='Sold').filter(days_on_lot__gt=0).order_by('-days_on_lot')[:5],
        many=True
    ).data

    # Location stats
    locations = Location.objects.all()
    loc_stats = []
    for loc in locations:
        loc_vehicles = loc.vehicles.all()
        loc_stats.append({
            'name': loc.name,
            'capacity': loc.capacity,
            'total': loc_vehicles.count(),
            'in_stock': loc_vehicles.filter(status='In Stock').count(),
            'sold': loc_vehicles.filter(status='Sold').count(),
            'reserved': loc_vehicles.filter(status='Reserved').count(),
            'in_service': loc_vehicles.filter(status='In Service').count(),
        })

    return Response({
        'total_revenue': total_revenue,
        'total_profit': total_profit,
        'total_vehicles': vehicles.count(),
        'vehicles_in_stock': in_stock.count(),
        'vehicles_sold': sold.count(),
        'vehicles_reserved': vehicles.filter(status='Reserved').count(),
        'vehicles_in_service': vehicles.filter(status='In Service').count(),
        'inventory_value': inv_value,
        'avg_days_on_lot': round(avg_days, 1),
        'total_expenses': total_expenses,
        'total_customers': customers.count(),
        'active_leads': active_leads,
        'conversion_rate': round(conv_rate, 1),
        'recent_sales': recent_sales,
        'aging_stock': aging,
        'location_stats': loc_stats,
    })


# ═══════ Vehicles ═══════
class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        qs = Vehicle.objects.all()
        status_filter = self.request.query_params.get('status')
        make = self.request.query_params.get('make')
        location = self.request.query_params.get('location')
        search = self.request.query_params.get('search')

        if status_filter and status_filter != 'All':
            qs = qs.filter(status=status_filter)
        if make and make != 'All':
            qs = qs.filter(make=make)
        if location and location != 'All':
            qs = qs.filter(location__name=location)
        if search:
            qs = qs.filter(
                Q(make__icontains=search) | Q(model__icontains=search) |
                Q(vin__icontains=search) | Q(color__icontains=search)
            )
        return qs

    def perform_create(self, serializer):
        vehicle = serializer.save()
        log_action("Vehicle Added", str(vehicle), self.request.user.username)

    def perform_destroy(self, instance):
        log_action("Vehicle Deleted", str(instance), self.request.user.username)
        instance.delete()

    @action(detail=True, methods=['post'])
    def sell(self, request, pk=None):
        vehicle = self.get_object()
        buyer_name = request.data.get('buyer_name')
        sale_price = request.data.get('sale_price', vehicle.price)
        method = request.data.get('method', 'Cash')
        salesperson_id = request.data.get('salesperson_id')

        # Find or create customer
        customer, _ = Customer.objects.get_or_create(
            name=buyer_name,
            defaults={'stage': 'Closed Won', 'source': 'Walk-in'}
        )
        customer.stage = 'Closed Won'
        customer.save()

        # Find salesperson
        salesperson = None
        if salesperson_id:
            salesperson = Employee.objects.filter(id=salesperson_id).first()

        # Create sale
        sale = Sale.objects.create(
            vehicle=vehicle,
            customer=customer,
            salesperson=salesperson,
            sale_price=Decimal(str(sale_price)),
            method=method,
        )

        # Update vehicle
        vehicle.status = 'Sold'
        vehicle.days_on_lot = 0
        vehicle.save()

        log_action("Vehicle Sold", f"{vehicle} → {buyer_name}", self.request.user.username)
        return Response(SaleSerializer(sale).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def add_expense(self, request, pk=None):
        vehicle = self.get_object()
        serializer = VehicleExpenseSerializer(data={
            **request.data, 'vehicle': vehicle.id
        })
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ═══════ Customers ═══════
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def get_queryset(self):
        qs = Customer.objects.all()
        stage = self.request.query_params.get('stage')
        source = self.request.query_params.get('source')
        search = self.request.query_params.get('search')

        if stage and stage != 'All':
            qs = qs.filter(stage=stage)
        if source and source != 'All':
            qs = qs.filter(source=source)
        if search:
            qs = qs.filter(Q(name__icontains=search) | Q(email__icontains=search))
        return qs

    def perform_create(self, serializer):
        customer = serializer.save()
        log_action("Customer Added", f"{customer.name} — {customer.stage}", self.request.user.username)

    @action(detail=True, methods=['post'])
    def change_stage(self, request, pk=None):
        customer = self.get_object()
        new_stage = request.data.get('stage')
        if new_stage in dict(Customer.STAGE_CHOICES):
            old_stage = customer.stage
            customer.stage = new_stage
            customer.save()
            log_action("Stage Changed", f"{customer.name}: {old_stage} → {new_stage}", self.request.user.username)
            return Response(CustomerSerializer(customer).data)
        return Response({'error': 'Invalid stage'}, status=status.HTTP_400_BAD_REQUEST)


# ═══════ Employees ═══════
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        qs = Employee.objects.all()
        role = self.request.query_params.get('role')
        location = self.request.query_params.get('location')
        emp_status = self.request.query_params.get('status')

        if role and role != 'All':
            qs = qs.filter(role=role)
        if location and location != 'All':
            qs = qs.filter(location__name=location)
        if emp_status and emp_status != 'All':
            qs = qs.filter(status=emp_status)
        return qs

    def perform_create(self, serializer):
        emp = serializer.save()
        log_action("Employee Added", f"{emp.name} — {emp.role}", self.request.user.username)


# ═══════ Sales ═══════
class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

    def get_queryset(self):
        qs = Sale.objects.all()
        method = self.request.query_params.get('method')
        salesperson = self.request.query_params.get('salesperson')
        search = self.request.query_params.get('search')

        if method and method != 'All':
            qs = qs.filter(method=method)
        if salesperson and salesperson != 'All':
            qs = qs.filter(salesperson__name=salesperson)
        if search:
            qs = qs.filter(
                Q(vehicle__make__icontains=search) | Q(vehicle__model__icontains=search) |
                Q(customer__name__icontains=search)
            )
        return qs


# ═══════ Expenses ═══════
class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        qs = Expense.objects.all()
        category = self.request.query_params.get('category')
        exp_status = self.request.query_params.get('status')
        vendor = self.request.query_params.get('vendor')
        search = self.request.query_params.get('search')

        if category and category != 'All':
            qs = qs.filter(category=category)
        if exp_status and exp_status != 'All':
            qs = qs.filter(status=exp_status)
        if vendor and vendor != 'All':
            qs = qs.filter(vendor=vendor)
        if search:
            qs = qs.filter(
                Q(description__icontains=search) | Q(vendor__icontains=search) |
                Q(reference_no__icontains=search)
            )
        return qs

    def perform_create(self, serializer):
        expense = serializer.save()
        log_action("Expense Created", f"{expense.description} (${expense.amount})", self.request.user.username)


# ═══════ Documents ═══════
class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        qs = Document.objects.all()
        category = self.request.query_params.get('category')
        file_type = self.request.query_params.get('type')
        search = self.request.query_params.get('search')

        if category and category != 'All':
            qs = qs.filter(category=category)
        if file_type and file_type != 'All':
            qs = qs.filter(file_type=file_type)
        if search:
            qs = qs.filter(Q(name__icontains=search) | Q(tags__icontains=search))
        return qs

    def perform_create(self, serializer):
        doc = serializer.save()
        log_action("Document Uploaded", doc.name, self.request.user.username)


# ═══════ Locations ═══════
class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


# ═══════ Settings ═══════
class SettingsViewSet(viewsets.ModelViewSet):
    queryset = DealershipSettings.objects.all()
    serializer_class = DealershipSettingsSerializer

    def list(self, request):
        settings, _ = DealershipSettings.objects.get_or_create(pk=1)
        return Response(DealershipSettingsSerializer(settings).data)

    def update(self, request, pk=None):
        settings, _ = DealershipSettings.objects.get_or_create(pk=1)
        serializer = DealershipSettingsSerializer(settings, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            log_action("Settings Updated", "Dealership settings modified", request.user.username)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ═══════ Audit Log ═══════
class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditLog.objects.all()[:50]
    serializer_class = AuditLogSerializer


# ═══════ Auth ═══════
@api_view(['GET'])
def current_user(request):
    return Response({
        'id': request.user.id,
        'username': request.user.username,
        'email': request.user.email,
        'first_name': request.user.first_name,
        'last_name': request.user.last_name,
    })
