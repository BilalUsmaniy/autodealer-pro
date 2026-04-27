from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

router = DefaultRouter()
router.register(r'vehicles', views.VehicleViewSet)
router.register(r'customers', views.CustomerViewSet)
router.register(r'employees', views.EmployeeViewSet)
router.register(r'sales', views.SaleViewSet)
router.register(r'expenses', views.ExpenseViewSet)
router.register(r'documents', views.DocumentViewSet)
router.register(r'locations', views.LocationViewSet)
router.register(r'settings', views.SettingsViewSet)
router.register(r'audit-log', views.AuditLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/me/', views.current_user, name='current_user'),
]
