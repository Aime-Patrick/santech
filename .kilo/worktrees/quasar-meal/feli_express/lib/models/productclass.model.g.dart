// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'productclass.model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Category _$CategoryFromJson(Map<String, dynamic> json) => Category(
      name: json['name'] as String,
      productClass: json['productClass'] as String,
      id: json['id'] as String,
    )..subCategories = (json['subCategories'] as List<dynamic>?)
        ?.map((e) =>
            e == null ? null : SubCategory.fromJson(e as Map<String, dynamic>))
        .toList();

Map<String, dynamic> _$CategoryToJson(Category instance) => <String, dynamic>{
      'name': instance.name,
      'productClass': instance.productClass,
      'id': instance.id,
      'subCategories': instance.subCategories,
    };

Brand _$BrandFromJson(Map<String, dynamic> json) => Brand(
      name: json['name'] as String,
      productClass: json['productClass'] as String,
      id: json['id'] as String,
    );

Map<String, dynamic> _$BrandToJson(Brand instance) => <String, dynamic>{
      'productClass': instance.productClass,
      'id': instance.id,
      'name': instance.name,
    };

ProductClass _$ProductClassFromJson(Map<String, dynamic> json) => ProductClass(
      name: json['name'] as String,
      createdAt: json['createdAt'] as String,
      updatedAt: json['updatedAt'] as String,
      categories: (json['categories'] as List<dynamic>?)
          ?.map((e) => Category.fromJson(e as Map<String, dynamic>))
          .toList(),
      brands: (json['brands'] as List<dynamic>?)
          ?.map((e) => Brand.fromJson(e as Map<String, dynamic>))
          .toList(),
      id: json['id'] as String,
    );

Map<String, dynamic> _$ProductClassToJson(ProductClass instance) =>
    <String, dynamic>{
      'name': instance.name,
      'createdAt': instance.createdAt,
      'updatedAt': instance.updatedAt,
      'categories': instance.categories,
      'brands': instance.brands,
      'id': instance.id,
    };
