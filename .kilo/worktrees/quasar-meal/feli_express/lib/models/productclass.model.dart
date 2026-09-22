import 'package:feli_express/models/subcategory.model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'productclass.model.g.dart';

@JsonSerializable()
class Category {
  String name;
  String productClass;
  String id;
  List<SubCategory?>? subCategories;

  Category({
    required this.name,
    required this.productClass,
    required this.id,
  });

  factory Category.fromJson(Map<String, dynamic> json) =>
      _$CategoryFromJson(json);
  Map<String, dynamic> toJson() => _$CategoryToJson(this);
}

@JsonSerializable()
class Brand {
  String productClass;
  String id;
  String name;

  Brand({
    required this.name,
    required this.productClass,
    required this.id,
  });

  factory Brand.fromJson(Map<String, dynamic> json) => _$BrandFromJson(json);
  Map<String, dynamic> toJson() => _$BrandToJson(this);
}

@JsonSerializable()
class ProductClass {
  String name;
  String createdAt;
  String updatedAt;
  List<Category>? categories;
  List<Brand>? brands;
  String id;

  ProductClass({
    required this.name,
    required this.createdAt,
    required this.updatedAt,
    this.categories,
    this.brands,
    required this.id,
  });

  factory ProductClass.fromJson(Map<String, dynamic> json) =>
      _$ProductClassFromJson(json);
  Map<String, dynamic> toJson() => _$ProductClassToJson(this);
}
