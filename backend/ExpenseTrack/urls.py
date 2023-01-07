from django.contrib import admin
from django.urls import path,include
from ExpenseTrack import views
urlpatterns = [
    path('register',views.register,name='register'),
    path('login',views.login,name='login'),
    path('getuser',views.get_user,name='getdata'),
    path('getdata',views.get_data,name='getdata'),
    path('gettrans',views.get_last_data,name='get transactions'),
    path('getgroups',views.get_groups,name='getgroups'),
    path('createroom',views.create_room,name='createroom'),
    path('addfriend',views.add_friend,name='addfriend'),
    path('split',views.split_expense,name='split_expense'),
    path('add',views.add_expense,name='add_expense'),
    path('getgroupdata',views.get_group_data,name='get_group_data'),
    path('delete',views.delete_expense,name='delete_expense'),
    path('trans',views.get_transactions,name='delete_expense'),
]