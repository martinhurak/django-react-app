
from django.contrib import admin
from django.urls import path , include
from todo_app.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView , TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("todo_app/user/register/", CreateUserView.as_view(), name="register"),
    # toto pojde ked zadam spravne udaje z registracie ničo ako prihalsenie 
    path("todo_app/token/", TokenObtainPairView.as_view(), name="get_token"),
    # sem zadam token  srefreshu 
    path("todo_app/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("todo_app-auth/", include("rest_framework.urls")),
    path("todo_app/" , include("todo_app.urls"))
    
]