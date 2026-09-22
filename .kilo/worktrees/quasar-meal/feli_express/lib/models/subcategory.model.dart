import 'package:feli_express/models/category.model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'subcategory.model.g.dart';

@JsonSerializable()
class SubCategory {
  String id;
  String name;
  String category;
  List<String?>? brands;

  SubCategory({
    required this.id,
    required this.name,
    required this.category,
    this.brands,
  });

  factory SubCategory.fromJson(Map<String, dynamic> json) =>
      _$SubCategoryFromJson(json);
  Map<String, dynamic> toJson() => _$SubCategoryToJson(this);
}
