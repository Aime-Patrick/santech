// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'order2.model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Card _$CardFromJson(Map<String, dynamic> json) => Card(
      first6digits: json['first_6digits'] as String,
      last4digits: json['last_4digits'] as String,
      issuer: json['issuer'] as String,
      country: json['country'] as String,
      type: json['type'] as String,
      expiry: json['expiry'] as String,
    );

Map<String, dynamic> _$CardToJson(Card instance) => <String, dynamic>{
      'first_6digits': instance.first6digits,
      'last_4digits': instance.last4digits,
      'issuer': instance.issuer,
      'country': instance.country,
      'type': instance.type,
      'expiry': instance.expiry,
    };

PaymentType _$PaymentTypeFromJson(Map<String, dynamic> json) => PaymentType(
      type: json['type'] as String,
      card: json['card'] == null
          ? null
          : Card.fromJson(json['card'] as Map<String, dynamic>),
      mobileNumber: json['mobileNumber'] as String?,
    );

Map<String, dynamic> _$PaymentTypeToJson(PaymentType instance) =>
    <String, dynamic>{
      'type': instance.type,
      'card': instance.card,
      'mobileNumber': instance.mobileNumber,
    };

Address _$AddressFromJson(Map<String, dynamic> json) => Address(
      street: json['street'] as String,
      id: json['id'] as String,
    );

Map<String, dynamic> _$AddressToJson(Address instance) => <String, dynamic>{
      'street': instance.street,
      'id': instance.id,
    };

ShippingAddress _$ShippingAddressFromJson(Map<String, dynamic> json) =>
    ShippingAddress(
      phoneNumber: json['phoneNumber'] as String,
      country: json['country'] as String,
      province: json['province'] as String,
      district: json['district'] as String,
      sector: json['sector'] as String,
      cell: json['cell'] as String,
      village: json['village'] as String,
      address: Address.fromJson(json['address'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$ShippingAddressToJson(ShippingAddress instance) =>
    <String, dynamic>{
      'phoneNumber': instance.phoneNumber,
      'country': instance.country,
      'province': instance.province,
      'district': instance.district,
      'sector': instance.sector,
      'cell': instance.cell,
      'village': instance.village,
      'address': instance.address,
    };

Variation _$VariationFromJson(Map<String, dynamic> json) => Variation(
      size: json['size'] as String?,
      color: json['color'] as String?,
    );

Map<String, dynamic> _$VariationToJson(Variation instance) => <String, dynamic>{
      'size': instance.size,
      'color': instance.color,
    };

ItemOrder _$ItemOrderFromJson(Map<String, dynamic> json) => ItemOrder(
      product: json['product'] as String,
      seller: json['seller'] as String,
      quantity: (json['quantity'] as num).toInt(),
      price: (json['price'] as num).toDouble(),
      productThumbnail: json['productThumbnail'] as String,
      sellerPaymentStatus: json['sellerPaymentStatus'] as String,
      id: json['id'] as String,
      variation: json['variation'] == null
          ? null
          : Variation.fromJson(json['variation'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$ItemOrderToJson(ItemOrder instance) => <String, dynamic>{
      'product': instance.product,
      'seller': instance.seller,
      'quantity': instance.quantity,
      'price': instance.price,
      'productThumbnail': instance.productThumbnail,
      'sellerPaymentStatus': instance.sellerPaymentStatus,
      'id': instance.id,
      'variation': instance.variation,
    };

Order2 _$Order2FromJson(Map<String, dynamic> json) => Order2(
      paymentType:
          PaymentType.fromJson(json['payment_type'] as Map<String, dynamic>),
      shippingAddress: ShippingAddress.fromJson(
          json['shippingAddress'] as Map<String, dynamic>),
      customer: json['customer'] as String,
      txRef: json['tx_ref'] as String,
      items: (json['items'] as List<dynamic>)
          .map((e) => ItemOrder.fromJson(e as Map<String, dynamic>))
          .toList(),
      amount: (json['amount'] as num).toDouble(),
      email: json['email'] as String,
      status: json['status'] as String,
      deliveryPreference: json['deliveryPreference'] as String?,
      createdAt: json['createdAt'] as String,
      updatedAt: json['updatedAt'] as String,
      id: json['id'] as String,
    );

Map<String, dynamic> _$Order2ToJson(Order2 instance) => <String, dynamic>{
      'payment_type': instance.paymentType,
      'shippingAddress': instance.shippingAddress,
      'customer': instance.customer,
      'tx_ref': instance.txRef,
      'items': instance.items,
      'amount': instance.amount,
      'email': instance.email,
      'status': instance.status,
      'deliveryPreference': instance.deliveryPreference,
      'createdAt': instance.createdAt,
      'updatedAt': instance.updatedAt,
      'id': instance.id,
    };
