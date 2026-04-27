from rest_framework import serializers
from .models import (
    Vehicle, VehicleExpense, Customer, Employee, Sale,
    Expense, Document, Location, DealershipSettings, AuditLog
)


class VehicleExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleExpense
        fields = '__all__'


class VehicleSerializer(serializers.ModelSerializer):
    expenses = VehicleExpenseSerializer(many=True, read_only=True)
    total_expenses = serializers.ReadOnlyField()
    net_margin = serializers.ReadOnlyField()
    location_name = serializers.CharField(source='location.name', read_only=True)

    class Meta:
        model = Vehicle
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    total_spent = serializers.ReadOnlyField()
    purchases = serializers.SerializerMethodField()

    class Meta:
        model = Customer
        fields = '__all__'

    def get_purchases(self, obj):
        return [
            {
                'car': str(s.vehicle),
                'date': s.date.strftime('%b %d, %Y') if s.date else '',
                'price': float(s.sale_price),
            }
            for s in obj.sales.all()
        ]


class EmployeeSerializer(serializers.ModelSerializer):
    sales_count = serializers.ReadOnlyField()
    total_revenue = serializers.ReadOnlyField()
    location_name = serializers.CharField(source='location.name', read_only=True)

    class Meta:
        model = Employee
        fields = '__all__'


class SaleSerializer(serializers.ModelSerializer):
    vehicle_name = serializers.CharField(source='vehicle.__str__', read_only=True)
    customer_name = serializers.CharField(source='customer.name', read_only=True)
    salesperson_name = serializers.CharField(source='salesperson.name', read_only=True)
    profit = serializers.ReadOnlyField()
    margin_pct = serializers.ReadOnlyField()
    vehicle_cost = serializers.DecimalField(source='vehicle.cost', max_digits=12, decimal_places=2, read_only=True)
    vehicle_expenses = serializers.ReadOnlyField(source='vehicle.total_expenses')

    class Meta:
        model = Sale
        fields = '__all__'


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'


class DocumentSerializer(serializers.ModelSerializer):
    vehicle_name = serializers.CharField(source='vehicle.__str__', read_only=True)
    customer_name = serializers.CharField(source='customer.name', read_only=True)

    class Meta:
        model = Document
        fields = '__all__'


class LocationSerializer(serializers.ModelSerializer):
    vehicle_count = serializers.SerializerMethodField()
    vehicles_by_status = serializers.SerializerMethodField()

    class Meta:
        model = Location
        fields = '__all__'

    def get_vehicle_count(self, obj):
        return obj.vehicles.count()

    def get_vehicles_by_status(self, obj):
        statuses = ['In Stock', 'Sold', 'Reserved', 'In Service']
        return {s: obj.vehicles.filter(status=s).count() for s in statuses}


class DealershipSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DealershipSettings
        fields = '__all__'


class AuditLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditLog
        fields = '__all__'


class DashboardSerializer(serializers.Serializer):
    """Aggregated dashboard data"""
    total_revenue = serializers.DecimalField(max_digits=14, decimal_places=2)
    total_profit = serializers.DecimalField(max_digits=14, decimal_places=2)
    total_vehicles = serializers.IntegerField()
    vehicles_in_stock = serializers.IntegerField()
    vehicles_sold = serializers.IntegerField()
    vehicles_reserved = serializers.IntegerField()
    vehicles_in_service = serializers.IntegerField()
    inventory_value = serializers.DecimalField(max_digits=14, decimal_places=2)
    avg_days_on_lot = serializers.FloatField()
    total_expenses = serializers.DecimalField(max_digits=14, decimal_places=2)
    total_customers = serializers.IntegerField()
    active_leads = serializers.IntegerField()
    conversion_rate = serializers.FloatField()
