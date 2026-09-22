// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'subcategory.model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SubCategory _$SubCategoryFromJson(Map<String, dynamic> json) => SubCategory(
      id: json['id'] as String,
      name: json['name'] as String,
      category: json['category'] as String,
      brands:
          (json['brands'] as List<dynamic>?)?.map((e) => e as String?).toList(),
    );

Map<String, dynamic> _$SubCategoryToJson(SubCategory instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'category': instance.category,
      'brands': instance.brands,
    };
