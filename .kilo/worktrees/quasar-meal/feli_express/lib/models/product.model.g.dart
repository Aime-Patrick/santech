// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'product.model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Attribute _$AttributeFromJson(Map<String, dynamic> json) => Attribute(
      key: json['key'] as String,
      value: json['value'] as String,
    );

Map<String, dynamic> _$AttributeToJson(Attribute instance) => <String, dynamic>{
      'key': instance.key,
      'value': instance.value,
    };

Product _$ProductFromJson(Map<String, dynamic> json) => Product(
      colorMeasurementVariations: json['colorMeasurementVariations'] == null
          ? null
          : ColorMeasurementVariations.fromJson(
              json['colorMeasurementVariations'] as Map<String, dynamic>),
      name: json['name'] as String,
      seller: json['seller'] as String,
      category: json['category'] as String,
      subCategory: json['subCategory'] as String,
      description: json['description'] as String,
      stockQuantity: (json['stockQuantity'] as num).toInt(),
      price: (json['price'] as num).toInt(),
      currency: json['currency'] as String?,
      discountPercentage: (json['discountPercentage'] as num).toInt(),
      hasColors: json['hasColors'] as bool,
      hasMeasurements: json['hasMeasurements'] as bool,
      quantityParameter: json['quantityParameter'] as String?,
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: json['updatedAt'] as String,
      id: json['id'] as String,
      productClass: json['productClass'] as String,
      stockLocation: json['stockLocation'] as String?,
      attributes: (json['attributes'] as List<dynamic>?)
          ?.map((e) => Attribute.fromJson(e as Map<String, dynamic>))
          .toList(),
    )
      ..productImages = json['productImages'] == null
          ? null
          : ProductImages.fromJson(
              json['productImages'] as Map<String, dynamic>)
      ..brand = json['brand'] as String?;

Map<String, dynamic> _$ProductToJson(Product instance) => <String, dynamic>{
      'colorMeasurementVariations': instance.colorMeasurementVariations,
      'productImages': instance.productImages,
      'name': instance.name,
      'seller': instance.seller,
      'category': instance.category,
      'subCategory': instance.subCategory,
      'productClass': instance.productClass,
      'brand': instance.brand,
      'description': instance.description,
      'stockQuantity': instance.stockQuantity,
      'price': instance.price,
      'currency': instance.currency,
      'discountPercentage': instance.discountPercentage,
      'hasColors': instance.hasColors,
      'hasMeasurements': instance.hasMeasurements,
      'quantityParameter': instance.quantityParameter,
      'createdAt': instance.createdAt.toIso8601String(),
      'updatedAt': instance.updatedAt,
      'id': instance.id,
      'stockLocation': instance.stockLocation,
      'attributes': instance.attributes,
    };

ColorMeasurementVariations _$ColorMeasurementVariationsFromJson(
        Map<String, dynamic> json) =>
    ColorMeasurementVariations(
      measurementType: json['measurementType'] as String?,
      variations: (json['variations'] as List<dynamic>?)
          ?.map((e) =>
              e == null ? null : Variation.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$ColorMeasurementVariationsToJson(
        ColorMeasurementVariations instance) =>
    <String, dynamic>{
      'measurementType': instance.measurementType,
      'variations': instance.variations,
    };

ColorImg _$ColorImgFromJson(Map<String, dynamic> json) => ColorImg(
      url: json['url'] as String?,
      colorName: json['colorName'] as String?,
    );

Map<String, dynamic> _$ColorImgToJson(ColorImg instance) => <String, dynamic>{
      'url': instance.url,
      'colorName': instance.colorName,
    };

ProductImages _$ProductImagesFromJson(Map<String, dynamic> json) =>
    ProductImages(
      productThumbnail: ProductThumbnail.fromJson(
          json['productThumbnail'] as Map<String, dynamic>),
      otherImages: (json['otherImages'] as List<dynamic>?)
          ?.map((e) =>
              e == null ? null : OtherImage.fromJson(e as Map<String, dynamic>))
          .toList(),
      images:
          (json['images'] as List<dynamic>?)?.map((e) => e as String).toList(),
    );

Map<String, dynamic> _$ProductImagesToJson(ProductImages instance) =>
    <String, dynamic>{
      'productThumbnail': instance.productThumbnail,
      'otherImages': instance.otherImages,
      'images': instance.images,
    };

OtherImage _$OtherImageFromJson(Map<String, dynamic> json) => OtherImage(
      url: json['url'] as String?,
      id: json['id'] as String?,
    );

Map<String, dynamic> _$OtherImageToJson(OtherImage instance) =>
    <String, dynamic>{
      'url': instance.url,
      'id': instance.id,
    };

ProductThumbnail _$ProductThumbnailFromJson(Map<String, dynamic> json) =>
    ProductThumbnail(
      url: json['url'] as String,
    );

Map<String, dynamic> _$ProductThumbnailToJson(ProductThumbnail instance) =>
    <String, dynamic>{
      'url': instance.url,
    };

ProductClass _$ProductClassFromJson(Map<String, dynamic> json) => ProductClass(
      name: json['name'] as String,
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
      'id': instance.id,
      'categories': instance.categories,
      'brands': instance.brands,
    };

Brand _$BrandFromJson(Map<String, dynamic> json) => Brand(
      name: json['name'] as String,
      productClass: json['productClass'] as String?,
      id: json['id'] as String,
    );

Map<String, dynamic> _$BrandToJson(Brand instance) => <String, dynamic>{
      'productClass': instance.productClass,
      'id': instance.id,
      'name': instance.name,
    };

Category _$CategoryFromJson(Map<String, dynamic> json) => Category(
      name: json['name'] as String,
      productClass: json['productClass'] as String?,
      id: json['id'] as String,
    );

Map<String, dynamic> _$CategoryToJson(Category instance) => <String, dynamic>{
      'name': instance.name,
      'productClass': instance.productClass,
      'id': instance.id,
    };

Subcategory _$SubcategoryFromJson(Map<String, dynamic> json) => Subcategory(
      name: json['name'] as String,
      id: json['id'] as String,
      description: json['description'] as String?,
      category: json['category'] == null
          ? null
          : Category.fromJson(json['category'] as Map<String, dynamic>),
      brands:
          (json['brands'] as List<dynamic>?)?.map((e) => e as String).toList(),
    );

Map<String, dynamic> _$SubcategoryToJson(Subcategory instance) =>
    <String, dynamic>{
      'name': instance.name,
      'id': instance.id,
      'description': instance.description,
      'category': instance.category,
      'brands': instance.brands,
    };

Variation _$VariationFromJson(Map<String, dynamic> json) => Variation(
      colorImg: json['colorImg'] == null
          ? null
          : ColorImg.fromJson(json['colorImg'] as Map<String, dynamic>),
      measurementvalue: json['measurementvalue'] as String?,
      colorMeasurementVariationQuantity:
          (json['colorMeasurementVariationQuantity'] as num?)?.toInt(),
      id: json['id'] as String?,
      publicId: json['publicId'] as String?,
    );

Map<String, dynamic> _$VariationToJson(Variation instance) => <String, dynamic>{
      'colorImg': instance.colorImg,
      'measurementvalue': instance.measurementvalue,
      'colorMeasurementVariationQuantity':
          instance.colorMeasurementVariationQuantity,
      'id': instance.id,
      'publicId': instance.publicId,
    };
