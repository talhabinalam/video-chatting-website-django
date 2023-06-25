from django.contrib import admin
from .models import RoomMember

# Register your models here.
@admin.register(RoomMember)
class RoomAdmin(admin.ModelAdmin):
    list_display = ['name', 'uid', 'room_name']