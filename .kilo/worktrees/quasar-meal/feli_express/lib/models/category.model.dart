import 'package:feli_express/models/subcategory.model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'category.model.g.dart';

@JsonSerializable()
class Category {
  String id;
  String name;
  String productClass;

  List<SubCategory>? subCategories;

  Category({
    required this.id,
    required this.name,
    required this.productClass,
    this.subCategories,
  });

  factory Category.fromJson(Map<String, dynamic> json) =>
      _$CategoryFromJson(json);
  Map<String, dynamic> toJson() => _$CategoryToJson(this);
}
