from django.contrib import admin
from .models import (
    Vehicle, VehicleExpense, Customer, Employee, Sale,
    Expense, Document, Location, DealershipSettings, AuditLog
)

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ['year', 'make', 'model', 'status', 'price', 'location']
    list_filter = ['status', 'make', 'location']
    search_fields = ['make', 'model', 'vin']

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['name', 'stage', 'source', 'email', 'phone']
    list_filter = ['stage', 'source']
    search_fields = ['name', 'email']

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'location', 'status']
    list_filter = ['role', 'status', 'location']

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ['vehicle', 'customer', 'salesperson', 'sale_price', 'method', 'date']
    list_filter = ['method', 'date']

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ['description', 'category', 'amount', 'status', 'date']
    list_filter = ['category', 'status']

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ['name', 'file_type', 'category', 'uploaded_by', 'created_at']
    list_filter = ['file_type', 'category']

admin.site.register(Location)
admin.site.register(VehicleExpense)
admin.site.register(DealershipSettings)
admin.site.register(AuditLog)
