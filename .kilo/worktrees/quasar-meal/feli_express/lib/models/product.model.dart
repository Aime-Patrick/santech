import 'package:json_annotation/json_annotation.dart';

// -- generate map data automaticaly
part 'product.model.g.dart';

//  attributes: [{ key: String, value: String }],

@JsonSerializable()
class Attribute {
  String key;
  String value;

  Attribute({required this.key, required this.value});

  factory Attribute.fromJson(Map<String, dynamic> json) =>
      _$AttributeFromJson(json);
  Map<String, dynamic> toJson() => _$AttributeToJson(this);
}

@JsonSerializable()
class Product {
  ColorMeasurementVariations? colorMeasurementVariations;
  ProductImages? productImages;
  String name;
  String seller;
  String category;
  String subCategory;
  String productClass;
  String? brand;

  // Category category;
  // ProductClass productClass;
  // Subcategory subCategory;
  String description;
  int stockQuantity;
  int price;
  String? currency;
  // Brand? brand;
  int discountPercentage;
  bool hasColors;
  bool hasMeasurements;
  String? quantityParameter;

  DateTime createdAt;
  String updatedAt;
  String id;

  String? stockLocation;
  List<Attribute>? attributes;

  Product({
    this.colorMeasurementVariations,
    // required this.productImages,
    required this.name,
    required this.seller,
    required this.category,
    required this.subCategory,
    required this.description,
    required this.stockQuantity,
    required this.price,
    this.currency,
    required this.discountPercentage,
    required this.hasColors,
    required this.hasMeasurements,
    this.quantityParameter,
    required this.createdAt,
    required this.updatedAt,
    required this.id,
    required this.productClass,
    required this.stockLocation,
    this.attributes,
  });

  factory Product.fromJson(Map<String, dynamic> json) =>
      _$ProductFromJson(json);
  Map<String, dynamic> toJson() => _$ProductToJson(this);
}

@JsonSerializable()
class ColorMeasurementVariations {
  String? measurementType;
  List<Variation?>? variations;

  ColorMeasurementVariations({this.measurementType, this.variations});

  factory ColorMeasurementVariations.fromJson(Map<String, dynamic> json) =>
      _$ColorMeasurementVariationsFromJson(json);
  Map<String, dynamic> toJson() => _$ColorMeasurementVariationsToJson(this);
}

// @JsonSerializable()
// class Variations {
//   ColorImg? colorImg;
//   String? measurementvalue;
//   int? colorMeasurementVariationQuantity;

//   String? id;

//   Variations(
//       {this.colorImg,
//       this.measurementvalue,
//       this.colorMeasurementVariationQuantity,
//       this.id});

//   factory Variations.fromJson(Map<String, dynamic> json) =>
//       _$VariationsFromJson(json);
//   Map<String, dynamic> toJson() => _$VariationsToJson(this);
// }

@JsonSerializable()
class ColorImg {
  String? url;
  String? colorName;

  ColorImg({this.url, this.colorName});

  factory ColorImg.fromJson(Map<String, dynamic> json) =>
      _$ColorImgFromJson(json);
  Map<String, dynamic> toJson() => _$ColorImgToJson(this);
}

@JsonSerializable()
class ProductImages {
  ProductThumbnail productThumbnail;
  List<OtherImage?>? otherImages;
  List<String>? images;

  ProductImages(
      {required this.productThumbnail, this.otherImages, this.images});

  factory ProductImages.fromJson(Map<String, dynamic> json) =>
      _$ProductImagesFromJson(json);
  Map<String, dynamic> toJson() => _$ProductImagesToJson(this);
}

@JsonSerializable()
class OtherImage {
  String? url;
  String? _id;
  String? id;

  OtherImage({
    this.url,
    this.id,
  });

  factory OtherImage.fromJson(Map<String, dynamic> json) =>
      _$OtherImageFromJson(json);
  Map<String, dynamic> toJson() => _$OtherImageToJson(this);
}

@JsonSerializable()
class ProductThumbnail {
  String url;

  ProductThumbnail({required this.url});

  factory ProductThumbnail.fromJson(Map<String, dynamic> json) =>
      _$ProductThumbnailFromJson(json);
  Map<String, dynamic> toJson() => _$ProductThumbnailToJson(this);
}

@JsonSerializable()
class ProductClass {
  String name;
  String id;
  List<Category>? categories;
  List<Brand>? brands;

  ProductClass({
    required this.name,
    this.categories,
    this.brands,
    required this.id,
  });

  factory ProductClass.fromJson(Map<String, dynamic> json) =>
      _$ProductClassFromJson(json);
  Map<String, dynamic> toJson() => _$ProductClassToJson(this);
}

@JsonSerializable()
class Brand {
  String? productClass;
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
class Category {
  String name;
  String? productClass;
  String id;

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
class Subcategory {
  String name;
  String id;
  String? description;
  Category? category;
  List<String>? brands;

  Subcategory(
      {required this.name,
      required this.id,
      this.description,
      this.category,
      required this.brands});

  factory Subcategory.fromJson(Map<String, dynamic> json) =>
      _$SubcategoryFromJson(json);
  Map<String, dynamic> toJson() => _$SubcategoryToJson(this);
}

@JsonSerializable()
class Variation {
  ColorImg? colorImg;
  String? measurementvalue;
  int? colorMeasurementVariationQuantity;
  String? id;
  String? publicId;

  Variation({
    this.colorImg,
    this.measurementvalue,
    this.colorMeasurementVariationQuantity,
    this.id,
    this.publicId,
  });

  // factory Variation.fromJson(Map<String, dynamic> json) {
  //   return Variation(
  //     colorImg: ColorImg.fromJson(json['colorImg']),
  //     measurementvalue: json['measurementvalue'],
  //     colorMeasurementVariationQuantity:
  //         json['colorMeasurementVariationQuantity'],
  //     id: json['id'],
  //     publicId: json['_id'],
  //   );
  // }

  factory Variation.fromJson(Map<String, dynamic> json) {
    return Variation(
      colorImg:
          json['colorImg'] != null ? ColorImg.fromJson(json['colorImg']) : null,
      measurementvalue: json['measurementvalue'],
      colorMeasurementVariationQuantity:
          json['colorMeasurementVariationQuantity'] ?? 0,
      id: json['id'],
      publicId: json['_id'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'colorImg': colorImg?.toJson(),
      'measurementvalue': measurementvalue,
      'colorMeasurementVariationQuantity': colorMeasurementVariationQuantity,
      'id': id,
      '_id': publicId,
    };
  }
}
