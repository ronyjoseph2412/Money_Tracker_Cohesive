from rest_framework.decorators import api_view
# To return the Response in JSON format
from rest_framework.response import Response
# For Validation of Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from knox.auth import AuthToken
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer
import json
from django.http import JsonResponse
from .models import User_data,Group
@api_view(['POST'])
def register(request):
    data = json.loads(request.body)
    if(len(data['password'])<6):
        return(Response({'error':'Password should be atleast 6 characters'},status=400))
    serializer = RegisterSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    user_data = User_data(username=user.username,income=data['income'],expense="0",savings=data['savings'],profession=data['profession'])
    user_data.save()
    _,token = AuthToken.objects.create(user)
    return JsonResponse({
        'user_info':{
            'id':user.id,
            'username':user.username,
            'email':user.email,
            'first_name':user.first_name,
            'last_name':user.last_name,
        },
        'token':token
    },safe=False)
# Login Route
@api_view(['POST'])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    # Raising expection if password or username is incorrect
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    _,token = AuthToken.objects.create(user)
    
    return Response({
        'user_info':{
            'id':user.id,
            'username':user.username,
            'email':user.email,
        },
        
        'token': token})

@api_view(['GET'])
def get_user(request):
    user = request.user
    if(user.is_authenticated):
        user_data = User_data.objects.get(username=user.username)
        return Response({
            'user_info':{
                'id':user.id,
                'username':user.username,
                'email':user.email,
                'first_name':user.first_name,
                'last_name':user.last_name,
                'friends':user_data.friends['friends'],
                'income':user_data.income,
                'savings':user_data.savings,
                'expense':user_data.expense,
                'profession':user_data.profession,
        }
    })
    
    return Response({'error':'User is not authenticated'},status=400)
@api_view(['GET'])
def get_transactions(request):
    user = request.user
    if(user.is_authenticated):
        user_data = User_data.objects.get(username=user.username)
        return Response({
            'user_info':{
                'id':user.id,
                'username':user.username,
                'email':user.email,
                'first_name':user.first_name,
                'last_name':user.last_name,
                'transactions':user_data.transcations['transcations'][::-1],
        }
    })
    
    return Response({'error':'User is not authenticated'},status=400)

@api_view(['GET'])
def get_groups(request):
    user = request.user
    if(user.is_authenticated):
        user_data = User_data.objects.get(username=user.username)
        groups = user_data.groups['groups']
        return Response({
            'groups':groups
        })
    return Response({'error':'User is not authenticated'},status=400)

@api_view(['GET'])
def get_data(request):
    user = request.user
    if(user.is_authenticated):
        user_data = User_data.objects.get(username=user.username)
        if(len(user_data.transcations['transcations'])>5):
            transactions = user_data.transcations['transcations'][::-1][0:5]
        
        else:
            transactions = user_data.transcations['transcations'][::-1]

        return Response({
            'data':{
                'username':user_data.username,
                'expense':user_data.expense,
                'income':user_data.income,
                # 'budget':user_data.budget,
                'balance':int(user_data.income)-int(user_data.expense),
                'transactions':transactions,
                'number':len(user_data.transcations['transcations']),
            }
        })
@api_view(['GET'])
def get_last_data(request):
    user = request.user
    if(user.is_authenticated):
        user_data = User_data.objects.get(username=user.username)
        if(len(user_data.transcations['transcations'])>5):
            transactions = user_data.transcations['transcations'][::-1][0:5]
        
        else:
            transactions = user_data.transcations['transcations']

        return Response({
            'transactions':transactions,            
        })

@api_view(['POST'])
def add_friend(request):
    user = request.user
    if(user.is_authenticated):
        data = json.loads(request.body)
        user_data = User_data.objects.get(username=user.username)
        user_data.friends['friends'].append(data['friend'])
        user_data.save()
        friend_data = User_data.objects.get(username=data['friend'])
        friend_data.friends['friends'].append(user.username)
        friend_data.save()
        return Response({'message':'Friend Sucessfully Added'})
    return Response({'error':'User is not authenticated'},status=400)

@api_view(['POST'])
def create_room(request):
    user = request.user
    if(user.is_authenticated):
        data = json.loads(request.body)
        user_data = User_data.objects.get(username=user.username)
        # print(data['members'])
        members = data['members']
        members.append(user.username)
        group = Group.objects.create(group_name=data['name'],group_members=members)
        group.save()
        for member in members:
            user_data = User_data.objects.get(username=member)
            user_data.groups['groups'].append(data['name'])
            user_data.save()
        return Response({'message':'Group Sucessfully Created'})
    return Response({'error':'User is not authenticated'},status=400)
# Split Expense Route
@api_view(['POST'])
def split_expense(request):
    user = request.user
    if(user.is_authenticated):
        data = json.loads(request.body)
        group = Group.objects.get(group_name=data['group_name'])
        group.group_expense = str(int(group.group_expense)+int(data['expense']))
        # ["ID","Split_By",[[Split_Among,True/False]],"Category","Amount","Description","Date","Month","Year"]
        group.group_transcations['transcations'].append(data['expense_data'])
        for x in data['expense_data'][2]:
            if(x[1]):
                user_data = User_data.objects.get(username=x[0])
                number = len(data['expense_data'][2])
                amount = int(float(data['expense_data'][4]))/(number)
                user_data.expense = str(int(float(user_data.expense))+(int((amount))))
                # ["Group Name / Self","ID","Category","Amount","Description","Date","Month","Year"]
                y = len(user_data.transcations['transcations'])+1
                
                user_data.transcations['transcations'].append([data['group_name'],y,data['expense_data'][3],(int(data['expense_data'][4])/(number)),data['expense_data'][5],data['expense_data'][6],data['expense_data'][7],data['expense_data'][8]])
                user_data.save()
                            
        # group.expenses.append(data['expense'])
        group.save()
        return Response({'message':'Expense Added'})
    return Response({'error':'User is not authenticated'},status=400)

@api_view(['POST'])
def add_expense(request):
    user = request.user
    if(user.is_authenticated):
        data = json.loads(request.body)
        user_data = User_data.objects.get(username=user.username)
        user_data.expense = str(int(user_data.expense)+int(data['expense']))
        # ["Group Name / Self","ID","Category","Amount","Description","Date","Month","Year"]
        user_data.transcations['transcations'].append(data['expense_data'])
        user_data.save()
        if(data['expense_data'][0]!='Self'):
            group = Group.objects.get(group_name=data['expense_data'][0])
            # group.group_expense = str(int(group.group_expense)+int(data['expense']))
            # ["ID","Split_By",[[Split_Among,True/False]],"Category","Amount","Description","Date","Month","Year"]
            for x in group.group_transcations['transcations']:
                print(x)
                if(x[0]==data['expense_data'][1]):
                    print("loop")
                    for y in x[2]:
                        if(y[0]==user.username):
                            y[1] = True
            # print(group.group_transcations['transcations'])
            # group.expenses.append(data['expense'])
            group.save()
        return Response({'message':'Expense Added'})
    return Response({'error':'User is not authenticated'},status=400)

@api_view(['POST'])
def get_group_data(request):
    user = request.user
    if(user.is_authenticated):
        group = Group.objects.get(group_name=request.data['group_name'])
        return Response({
            'group_name':group.group_name,
            'group_members':group.group_members,
            'group_expense':group.group_expense,
            'group_transcations':group.group_transcations['transcations'][::-1]
        })
    return Response({'error':'User is not authenticated'},status=400)

@api_view(['POST'])
def delete_expense(request):
    user = request.user
    if(user.is_authenticated):
        data = json.loads(request.body)
        user_data = User_data.objects.get(username=user.username)
        user_data.expense = str(int(user_data.expense)-int(data['expense']))
        # ["Group Name / Self","ID","Category","Amount","Description","Date","Month","Year"]
        for x in user_data.transcations['transcations']:
            if(x[1]==int(data['expense_data'])):
                user_data.transcations['transcations'].remove(x)
                break
        user_data.save()
        return Response({'message':'Expense Deleted'})
    return Response({'error':'User is not authenticated'},status=400)

