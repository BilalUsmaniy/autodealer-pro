from django.db import models
from django.contrib.auth.models import User
import uuid


class Location(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=20, blank=True)
    manager = models.CharField(max_length=100, blank=True)
    capacity = models.IntegerField(default=50)
    weekday_hours = models.CharField(max_length=50, default="9:00 AM – 7:00 PM")
    saturday_hours = models.CharField(max_length=50, default="10:00 AM – 6:00 PM")
    sunday_hours = models.CharField(max_length=50, default="Closed")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Vehicle(models.Model):
    STATUS_CHOICES = [
        ('In Stock', 'In Stock'),
        ('Sold', 'Sold'),
        ('Reserved', 'Reserved'),
        ('In Service', 'In Service'),
    ]
    FUEL_CHOICES = [
        ('Gasoline', 'Gasoline'),
        ('Diesel', 'Diesel'),
        ('Electric', 'Electric'),
        ('Hybrid', 'Hybrid'),
        ('Plug-in Hybrid', 'Plug-in Hybrid'),
    ]
    TRANSMISSION_CHOICES = [
        ('Automatic', 'Automatic'),
        ('Manual', 'Manual'),
        ('CVT', 'CVT'),
        ('Dual-Clutch', 'Dual-Clutch'),
    ]

    year = models.IntegerField()
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=100)
    vin = models.CharField(max_length=17, unique=True)
    color = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    cost = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='In Stock')
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, related_name='vehicles')
    mileage = models.IntegerField(default=0)
    fuel = models.CharField(max_length=20, choices=FUEL_CHOICES, default='Gasoline')
    transmission = models.CharField(max_length=20, choices=TRANSMISSION_CHOICES, default='Automatic')
    engine = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='vehicles/', null=True, blank=True)
    days_on_lot = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.year} {self.make} {self.model}"

    @property
    def total_expenses(self):
        return sum(e.amount for e in self.expenses.all())

    @property
    def net_margin(self):
        return float(self.price) - float(self.cost) - self.total_expenses


class VehicleExpense(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='expenses')
    description = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.description} - ${self.amount}"


class Customer(models.Model):
    STAGE_CHOICES = [
        ('Lead', 'Lead'),
        ('Contacted', 'Contacted'),
        ('Negotiating', 'Negotiating'),
        ('Closed Won', 'Closed Won'),
        ('Closed Lost', 'Closed Lost'),
    ]
    SOURCE_CHOICES = [
        ('Walk-in', 'Walk-in'),
        ('Website', 'Website'),
        ('Referral', 'Referral'),
        ('Social Media', 'Social Media'),
        ('Auto Trader', 'Auto Trader'),
        ('CarGurus', 'CarGurus'),
        ('Phone Call', 'Phone Call'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES, default='Lead')
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES, default='Walk-in')
    interest = models.CharField(max_length=100, blank=True, help_text="Interested make/model")
    rating = models.IntegerField(default=3, choices=[(i, i) for i in range(1, 6)])
    notes = models.TextField(blank=True)
    last_contact = models.DateField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name

    @property
    def total_spent(self):
        return sum(s.sale_price for s in self.sales.all())


class Employee(models.Model):
    ROLE_CHOICES = [
        ('Sales Manager', 'Sales Manager'),
        ('Sales Associate', 'Sales Associate'),
        ('Finance Manager', 'Finance Manager'),
        ('Lot Manager', 'Lot Manager'),
        ('Service Advisor', 'Service Advisor'),
        ('Customer Relations', 'Customer Relations'),
        ('General Manager', 'General Manager'),
    ]
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
    ]

    name = models.CharField(max_length=100)
    role = models.CharField(max_length=30, choices=ROLE_CHOICES)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, related_name='employees')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Active')
    start_date = models.DateField(null=True, blank=True)
    commission = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    target_monthly = models.DecimalField(max_digits=10, decimal_places=2, default=50000)
    achieved_monthly = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    @property
    def sales_count(self):
        return self.sales.count()

    @property
    def total_revenue(self):
        return sum(s.sale_price for s in self.sales.all())


class Sale(models.Model):
    METHOD_CHOICES = [
        ('Cash', 'Cash'),
        ('Finance', 'Finance'),
        ('Lease', 'Lease'),
    ]

    vehicle = models.OneToOneField(Vehicle, on_delete=models.CASCADE, related_name='sale')
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, related_name='sales')
    salesperson = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, related_name='sales')
    sale_price = models.DecimalField(max_digits=12, decimal_places=2)
    method = models.CharField(max_length=10, choices=METHOD_CHOICES, default='Cash')
    date = models.DateField(auto_now_add=True)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"Sale: {self.vehicle} → {self.customer}"

    @property
    def profit(self):
        vehicle_expenses = self.vehicle.total_expenses if self.vehicle else 0
        return float(self.sale_price) - float(self.vehicle.cost) - vehicle_expenses

    @property
    def margin_pct(self):
        if self.vehicle and self.vehicle.cost > 0:
            return (self.profit / float(self.vehicle.cost)) * 100
        return 0


class Expense(models.Model):
    CATEGORY_CHOICES = [
        ('Rent', 'Rent'), ('Salaries', 'Salaries'), ('Marketing', 'Marketing'),
        ('Insurance', 'Insurance'), ('Utilities', 'Utilities'), ('Detailing', 'Detailing'),
        ('Transport', 'Transport'), ('Repairs', 'Repairs'), ('Legal', 'Legal'),
        ('Software', 'Software'), ('Parts', 'Parts'), ('Office Supplies', 'Office Supplies'),
    ]
    STATUS_CHOICES = [
        ('Paid', 'Paid'), ('Pending', 'Pending'), ('Overdue', 'Overdue'),
    ]
    PAYMENT_CHOICES = [
        ('Bank Transfer', 'Bank Transfer'), ('Credit Card', 'Credit Card'),
        ('Cash', 'Cash'), ('Check', 'Check'), ('ACH', 'ACH'),
    ]

    description = models.CharField(max_length=255)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    vendor = models.CharField(max_length=100, blank=True)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES, default='Bank Transfer')
    reference_no = models.CharField(max_length=50, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')
    recurring = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.description} - ${self.amount}"


class Document(models.Model):
    TYPE_CHOICES = [
        ('PDF', 'PDF'), ('DOCX', 'DOCX'), ('XLSX', 'XLSX'),
        ('PNG', 'PNG'), ('JPG', 'JPG'), ('CSV', 'CSV'), ('TXT', 'TXT'),
    ]
    CATEGORY_CHOICES = [
        ('Sales', 'Sales'), ('Insurance', 'Insurance'), ('Legal', 'Legal'),
        ('Finance', 'Finance'), ('Service', 'Service'), ('HR', 'HR'), ('Marketing', 'Marketing'),
    ]

    name = models.CharField(max_length=200)
    file = models.FileField(upload_to='documents/')
    file_type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='PDF')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='Sales')
    vehicle = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, null=True, blank=True, related_name='documents')
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True, related_name='documents')
    uploaded_by = models.CharField(max_length=100, blank=True)
    tags = models.CharField(max_length=300, blank=True, help_text="Comma-separated tags")
    size = models.IntegerField(default=0, help_text="File size in bytes")
    pages = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class DealershipSettings(models.Model):
    name = models.CharField(max_length=100, default="AutoDealer Pro")
    owner_name = models.CharField(max_length=100, default="John Dealer")
    email = models.EmailField(default="info@autodealer.pro")
    phone = models.CharField(max_length=20, default="(732) 555-0001")
    address = models.CharField(max_length=255, default="1200 Auto Boulevard, Milltown NJ 08850")
    timezone = models.CharField(max_length=50, default="America/New_York")
    currency = models.CharField(max_length=10, default="USD")
    tax_rate = models.DecimalField(max_digits=5, decimal_places=3, default=6.625)
    default_markup = models.DecimalField(max_digits=5, decimal_places=2, default=12.0)
    dark_mode = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Dealership Settings"

    def __str__(self):
        return self.name


class AuditLog(models.Model):
    action = models.CharField(max_length=100)
    detail = models.CharField(max_length=300)
    user = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.action}: {self.detail}"
