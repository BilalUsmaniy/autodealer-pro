"""
Run with: python manage.py shell < api/seed.py
Populates the database with sample data for AutoDealer Pro.
"""
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'autodealer.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import *
from datetime import date, timedelta
from decimal import Decimal
import random

print("🚗 Seeding AutoDealer Pro database...")

# Create admin user
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@autodealer.pro', 'admin123')
    print("  ✓ Admin user created (admin / admin123)")

# Locations
loc1, _ = Location.objects.get_or_create(name="Milltown", defaults={"address":"1200 Auto Boulevard, Milltown NJ 08850","phone":"(732) 555-0100","manager":"Derek Brown","capacity":60})
loc2, _ = Location.objects.get_or_create(name="Elizabeth", defaults={"address":"850 Premium Drive, Elizabeth NJ 07201","phone":"(908) 555-0200","manager":"Lisa Chen","capacity":40})
print(f"  ✓ {Location.objects.count()} locations")

# Settings
DealershipSettings.objects.get_or_create(pk=1)
print("  ✓ Settings initialized")

# Employees
emps_data = [
    ("Sarah Kim","Sales Manager","sarah.kim@autodealer.pro","(732) 555-1001",loc1,38000,4.8,80000,72000),
    ("Mike Reeves","Sales Associate","mike.r@autodealer.pro","(732) 555-1002",loc2,24000,4.5,60000,55000),
    ("Tom Liu","Finance Manager","tom.liu@autodealer.pro","(732) 555-1003",loc1,18000,4.3,50000,42000),
    ("Ana Martinez","Sales Associate","ana.m@autodealer.pro","(908) 555-1004",loc2,28000,4.7,65000,68000),
    ("Derek Brown","Lot Manager","derek.b@autodealer.pro","(732) 555-1005",loc1,12000,4.1,35000,28000),
    ("Lisa Chen","Service Advisor","lisa.c@autodealer.pro","(908) 555-1006",loc2,5000,4.4,20000,18000),
]
employees = []
for name,role,email,phone,loc,comm,rating,target,achieved in emps_data:
    emp, _ = Employee.objects.get_or_create(name=name, defaults={
        "role":role,"email":email,"phone":phone,"location":loc,
        "commission":Decimal(str(comm)),"rating":Decimal(str(rating)),
        "target_monthly":Decimal(str(target)),"achieved_monthly":Decimal(str(achieved)),
        "start_date":date(2020+random.randint(0,4), random.randint(1,12), 1),
    })
    employees.append(emp)
print(f"  ✓ {Employee.objects.count()} employees")

# Vehicles
vehicles_data = [
    (2024,"BMW","M4 Competition","Alpine White",84995,72400,"In Stock",loc1,12,1200,"Gasoline","Automatic","3.0L I6 Twin-Turbo"),
    (2024,"Mercedes-Benz","AMG GT 63","Obsidian Black",137995,119200,"Reserved",loc2,3,850,"Gasoline","Automatic","4.0L V8 Bi-Turbo"),
    (2023,"Porsche","911 Turbo S","Guards Red",228500,198000,"In Stock",loc1,28,3200,"Gasoline","Dual-Clutch","3.7L Flat-6 Twin-Turbo"),
    (2024,"Tesla","Model S Plaid","Pearl White",108990,94500,"Sold",loc2,0,100,"Electric","Automatic","Tri Motor Electric"),
    (2024,"Audi","RS e-tron GT","Nardo Grey",152400,131800,"In Stock",loc1,45,4500,"Electric","Automatic","Dual Motor Electric"),
    (2023,"Lamborghini","Huracán EVO","Yellow",268000,232000,"In Stock",loc2,52,2800,"Gasoline","Dual-Clutch","5.2L V10"),
    (2024,"Land Rover","Range Rover Sport","Green",115995,99800,"In Service",loc1,7,8200,"Gasoline","Automatic","4.4L V8 Twin-Turbo"),
    (2024,"Ferrari","296 GTB","Red",352000,310000,"In Stock",loc2,18,650,"Hybrid","Dual-Clutch","3.0L V6 Hybrid"),
    (2024,"Toyota","GR Supra","Blue",58250,49800,"Sold",loc1,0,3400,"Gasoline","Manual","3.0L I6 Turbo"),
    (2024,"Chevrolet","Corvette","Orange",72995,62000,"Reserved",loc2,8,1100,"Gasoline","Dual-Clutch","6.2L V8"),
    (2023,"Rolls-Royce","Ghost","Black",345000,298000,"In Stock",loc1,38,5600,"Gasoline","Automatic","6.75L V12 Twin-Turbo"),
    (2024,"McLaren","750S","Silver",299000,260000,"In Stock",loc2,15,420,"Gasoline","Dual-Clutch","4.0L V8 Twin-Turbo"),
    (2024,"BMW","M3 CS","Black",78500,66000,"Sold",loc1,0,2100,"Gasoline","Automatic","3.0L I6 Twin-Turbo"),
    (2023,"Mercedes-Benz","GLE 63S","White",119750,102000,"Sold",loc2,0,6400,"Gasoline","Automatic","4.0L V8 Bi-Turbo"),
    (2024,"Porsche","Cayenne GTS","Midnight Blue",112000,96500,"In Stock",loc1,22,7800,"Gasoline","Automatic","4.0L V8 Twin-Turbo"),
    (2024,"Audi","RS7","Metallic Gray",125900,108000,"Sold",loc2,0,3100,"Gasoline","Automatic","4.0L V8 Twin-Turbo"),
    (2023,"Bentley","Continental GT","Burgundy",225000,195000,"In Stock",loc2,35,4200,"Gasoline","Dual-Clutch","6.0L W12 Twin-Turbo"),
    (2024,"Genesis","G80","Gray",58700,49200,"In Stock",loc1,10,1800,"Gasoline","Automatic","3.5L V6 Twin-Turbo"),
]

import string
def gen_vin():
    chars = string.ascii_uppercase.replace('I','').replace('O','').replace('Q','') + string.digits
    return ''.join(random.choice(chars) for _ in range(17))

vehicles = []
for yr,make,model,color,price,cost,st,loc,days,miles,fuel,trans,engine in vehicles_data:
    v, _ = Vehicle.objects.get_or_create(
        make=make, model=model, year=yr,
        defaults={
            "vin":gen_vin(),"color":color,"price":Decimal(str(price)),"cost":Decimal(str(cost)),
            "status":st,"location":loc,"days_on_lot":days,"mileage":miles,
            "fuel":fuel,"transmission":trans,"engine":engine,
        }
    )
    vehicles.append(v)
print(f"  ✓ {Vehicle.objects.count()} vehicles")

# Vehicle expenses
vexp_data = [
    (0, "Ceramic coating", 1200),
    (2, "PPF wrap", 3500),
    (4, "Tire replacement", 2800),
    (6, "Brake replacement", 4200),
    (6, "Oil change", 350),
    (10, "Interior detail", 800),
]
for vi, desc, amt in vexp_data:
    if vi < len(vehicles):
        VehicleExpense.objects.get_or_create(vehicle=vehicles[vi], description=desc, defaults={"amount":Decimal(str(amt))})
print(f"  ✓ {VehicleExpense.objects.count()} vehicle expenses")

# Customers
custs_data = [
    ("James Mitchell","james.mitchell@email.com","(713) 555-1201","Closed Won","Walk-in","Tesla Model S",5),
    ("Elena Rodriguez","elena.r@email.com","(908) 555-3344","Closed Won","Website","Toyota GR Supra",4),
    ("David Chen","d.chen@techcorp.com","(732) 555-7788","Closed Won","Referral","BMW M3",5),
    ("Priya Sharma","priya.sharma@gmail.com","(908) 555-2299","Closed Won","Auto Trader","Mercedes GLE",4),
    ("Marcus Thompson","marcus.t@outlook.com","(732) 555-4411","Closed Won","Social Media","Audi RS7",5),
    ("Sofia Petrov","sofia.p@email.com","(908) 555-6677","Negotiating","Walk-in","Porsche 911",4),
    ("Ryan O'Brien","ryan.ob@gmail.com","(732) 555-8833","Negotiating","Website","Range Rover",3),
    ("Mei Tanaka","mei.tanaka@corp.jp","(908) 555-9900","Contacted","Referral","Lexus LC 500",4),
    ("Carlos Garcia","carlos.g@email.com","(732) 555-1122","Lead","CarGurus","BMW X5 M",2),
    ("Natasha Williams","natasha.w@outlook.com","(908) 555-3366","Contacted","Phone Call","AMG C 63",3),
    ("Liam Foster","liam.f@email.com","(732) 555-0088","Lead","Website","Corvette",2),
    ("Zara Patel","zara.p@gmail.com","(908) 555-4499","Negotiating","Walk-in","Ferrari 296 GTB",5),
]
customers = []
for name,email,phone,stage,source,interest,rating in custs_data:
    c, _ = Customer.objects.get_or_create(name=name, defaults={
        "email":email,"phone":phone,"stage":stage,"source":source,
        "interest":interest,"rating":rating,
    })
    customers.append(c)
print(f"  ✓ {Customer.objects.count()} customers")

# Sales (for sold vehicles)
sales_map = [
    (3, 0, 0, 108990, "Finance"),  # Tesla → James
    (8, 1, 1, 57500, "Cash"),       # Supra → Elena
    (12, 2, 0, 77000, "Finance"),   # M3 → David
    (13, 3, 3, 118000, "Lease"),    # GLE → Priya
    (15, 4, 2, 124500, "Finance"),  # RS7 → Marcus
]
for vi, ci, ei, price, method in sales_map:
    if vi < len(vehicles) and ci < len(customers) and ei < len(employees):
        Sale.objects.get_or_create(vehicle=vehicles[vi], defaults={
            "customer":customers[ci],"salesperson":employees[ei],
            "sale_price":Decimal(str(price)),"method":method,
        })
print(f"  ✓ {Sale.objects.count()} sales")

# Expenses
expenses_data = [
    ("Main lot lease — March","Rent",24000,"Paid","Houston Property Mgmt","Bank Transfer","INV-2026-0301",True),
    ("Staff payroll — February","Salaries",45000,"Paid","ADP Payroll","ACH","PAY-2026-0228",True),
    ("Google Ads — Q1","Marketing",8500,"Paid","Google Ads","Credit Card","GA-2026-Q1",False),
    ("Fleet insurance renewal","Insurance",12800,"Paid","State Farm","Bank Transfer","INS-2026-0215",True),
    ("Electric bill — Feb","Utilities",2850,"Paid","NJ Electric Co","ACH","UTIL-2026-0228",True),
    ("Vehicle detailing x18","Detailing",5400,"Paid","DetailPro LLC","Check","DET-2026-0303",False),
    ("Body shop — Range Rover","Repairs",6200,"Pending","Mike's Body Shop","Check","REP-2026-0302",False),
    ("CRM subscription","Software",2100,"Paid","Salesforce","Credit Card","SW-2026-0115",True),
    ("Tire inventory — Michelin","Parts",6800,"Overdue","AutoZone","Bank Transfer","PRT-2026-0304",False),
    ("Staff payroll — March","Salaries",46500,"Pending","ADP Payroll","ACH","PAY-2026-0305",True),
]
for desc,cat,amt,st,vendor,pm,ref,rec in expenses_data:
    Expense.objects.get_or_create(description=desc, defaults={
        "category":cat,"amount":Decimal(str(amt)),"status":st,
        "vendor":vendor,"payment_method":pm,"reference_no":ref,"recurring":rec,
    })
print(f"  ✓ {Expense.objects.count()} expenses")

# Documents
docs_data = [
    ("Bill of Sale — Tesla Model S Plaid","PDF","Sales","Sarah Kim","sale,tesla",245000,3),
    ("Fleet Insurance Certificate 2026","PDF","Insurance","Derek Brown","insurance,fleet",1200000,12),
    ("Main Lot Lease Agreement","DOCX","Legal","Tom Liu","lease,contract",890000,8),
    ("Q1 2026 Financial Report","XLSX","Finance","Ana Martinez","quarterly,report",2100000,5),
    ("Vehicle Inspection — Porsche 911","PDF","Service","Mike Reeves","inspection,porsche",3400000,4),
    ("Employee Handbook v4.2","PDF","HR","Derek Brown","handbook,policy",4800000,45),
]
for name,ftype,cat,uploader,tags,size,pages in docs_data:
    Document.objects.get_or_create(name=name, defaults={
        "file_type":ftype,"category":cat,"uploaded_by":uploader,
        "tags":tags,"size":size,"pages":pages,
    })
print(f"  ✓ {Document.objects.count()} documents")

# Audit log
log_entries = [
    ("Vehicle Sold","2024 Tesla Model S Plaid → James Mitchell","Sarah Kim"),
    ("Customer Added","Liam Foster — Lead from Website","System"),
    ("Expense Created","Staff payroll — March ($46,500)","Tom Liu"),
    ("Vehicle Added","2024 McLaren 750S — Elizabeth lot","Mike Reeves"),
    ("Settings Updated","Tax rate changed to 6.625%","John Dealer"),
]
for action, detail, user in log_entries:
    AuditLog.objects.get_or_create(action=action, detail=detail, defaults={"user":user})
print(f"  ✓ {AuditLog.objects.count()} audit log entries")

print("\n✅ Database seeded successfully!")
print(f"   Login: admin / admin123")
print(f"   API: http://localhost:8000/api/")
print(f"   Admin: http://localhost:8000/admin/")
