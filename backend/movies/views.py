
# Create your views here.
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import Q
from .models import Movie, Comment
from .serializers import (
    MovieDetailSerializer, MovieListSerializer,
    CommentSerializer, RegisterSerializer
)


class MovieListAPIView(APIView):
    """
    لیست فیلم‌ها جهت نمایش در TitleCards
    پشتیبانی از دسته‌بندی تک و چندگانه (مثلاً: ?category=action,comedy,adventure)
    """

    def get(self, request):
        category_param = request.query_params.get('category', None)
        queryset = Movie.objects.all()

        if category_param:
            # جداسازی دسته‌ها با ویرگول (پشتیبانی از آرایه ارسال شده از فرانت)
            categories = [c.strip() for c in category_param.split(',')]
            queryset = queryset.filter(
                Q(category__in=categories) | Q(genres__slug__in=categories)
            ).distinct()

        serializer = MovieListSerializer(queryset, many=True, context={'request': request})
        return Response({'results': serializer.data})


class MovieDetailAPIView(generics.RetrieveAPIView):
    """
    دریافت اطلاعات کامل فیلم برای کامپوننت Player
    """
    queryset = Movie.objects.all()
    serializer_class = MovieDetailSerializer
    lookup_field = 'id'


class MovieCommentListCreateAPIView(APIView):
    """
    دریافت و ثبت نظرات کاربران برای یک فیلم مشخص
    """

    def get(self, request, movie_id):
        comments = Comment.objects.filter(movie_id=movie_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, movie_id):
        try:
            movie = Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return Response({'error': 'فیلم مورد نظر یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(movie=movie)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterAPIView(APIView):
    """
    ثبت‌نام کاربر
    """

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.pk,
                'email': user.email,
                'username': user.username,
                'message': 'ثبت‌نام با موفقیت انجام شد'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    """
    ورود کاربر با ایمیل یا نام کاربری
    """

    def post(self, request):
        email = request.data.get('email')
        username = request.data.get('username') or email
        password = request.data.get('password')

        user = None
        if email:
            try:
                u = User.objects.get(email=email)
                user = authenticate(username=u.username, password=password)
            except User.DoesNotExist:
                pass

        if not user and username:
            user = authenticate(username=username, password=password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.pk,
                'email': user.email,
                'username': user.username,
                'message': 'ورود موفقیت‌آمیز بود'
            })
        return Response({'error': 'ایمیل/نام کاربری یا رمز عبور اشتباه است'}, status=status.HTTP_400_BAD_REQUEST)