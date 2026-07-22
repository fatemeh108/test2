from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Movie, Genre, CastMember, Comment

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name', 'slug']


class CastMemberSerializer(serializers.ModelSerializer):
    profile_path = serializers.SerializerMethodField()

    class Meta:
        model = CastMember
        fields = ['id', 'name', 'character', 'profile_path']

    def get_profile_path(self, obj):
        if obj.profile_image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.profile_image.url) if request else obj.profile_image.url
        return None


class CommentSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'email', 'text', 'date', 'movie']
        extra_kwargs = {'movie': {'required': False}}

    def get_date(self, obj):
        return obj.created_at.strftime("%Y/%m/%d")


class MovieListSerializer(serializers.ModelSerializer):
    poster_path = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = ['id', 'title', 'poster_path', 'vote_average']

    def get_poster_path(self, obj):
        if obj.poster:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.poster.url) if request else obj.poster.url
        return None


class MovieDetailSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)
    cast = CastMemberSerializer(source='cast_members', many=True, read_only=True)
    director = serializers.SerializerMethodField()
    writer = serializers.SerializerMethodField()
    poster_path = serializers.SerializerMethodField()
    backdrop_path = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = [
            'id', 'title', 'tagline', 'overview', 'release_date',
            'runtime', 'vote_average', 'vote_count', 'poster_path',
            'backdrop_path', 'trailer_key', 'genres', 'category',
            'director', 'writer', 'cast'
        ]

    def get_director(self, obj):
        return {'name': obj.director} if obj.director else None

    def get_writer(self, obj):
        return {'name': obj.writer} if obj.writer else None

    def get_poster_path(self, obj):
        if obj.poster:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.poster.url) if request else obj.poster.url
        return None

    def get_backdrop_path(self, obj):
        if obj.backdrop:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.backdrop.url) if request else obj.backdrop.url
        return None


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user