import 'package:feli_express/models/product.model.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:flutter/material.dart';

Widget sizeBox(
  BuildContext context,
  Product product,
) {
  return product.hasMeasurements
      ? SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: product?.colorMeasurementVariations?.variations?.map((e) {
                  return Row(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Card(
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Row(
                              children: [
                                Text(" Size : ${e?.measurementvalue ?? ''}  "),
                                Text(
                                    "Qty : ${e?.colorMeasurementVariationQuantity?.toString()}" ??
                                        ''),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  );
                })?.toList() ??
                [],
          ),
        )
      : const Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'No more sizes available',
              style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: AppColors.primarytextColor),
            ),
          ],
        );
}

class SizeBoxWidget extends StatefulWidget {
  final Product product;
  final Function(String)? onSizeSelected;
  final Function(int)? onQtySelected;
  final Function(String)? onImageSelected;

  SizeBoxWidget({
    required this.product,
    this.onSizeSelected,
    this.onQtySelected,
    this.onImageSelected,
  });

  @override
  _SizeBoxWidgetState createState() => _SizeBoxWidgetState();
}

class _SizeBoxWidgetState extends State<SizeBoxWidget> {
  String selectedSize = '';
  int selectedQty = 0;
  String selectedImage = '';

  @override
  Widget build(BuildContext context) {
    return widget.product.hasMeasurements
        ? SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: widget.product.colorMeasurementVariations?.variations
                      ?.map((e) {
                    return GestureDetector(
                      onTap: () {
                        setState(() {
                          selectedSize = e?.measurementvalue ?? '';
                          selectedQty =
                              e?.colorMeasurementVariationQuantity ?? 0;
                          selectedImage = widget
                                  .product.productImages?.productThumbnail
                                  ?.toString() ??
                              '';
                        });
                        if (widget.onSizeSelected != null) {
                          widget.onSizeSelected!(selectedSize);
                        }
                        if (widget.onQtySelected != null) {
                          widget.onQtySelected!(selectedQty);
                        }
                        if (widget.onImageSelected != null) {
                          widget.onImageSelected!(widget
                              .product.productImages!.productThumbnail
                              .toString());
                        }
                      },
                      child: Card(
                        color: selectedSize == e?.measurementvalue
                            ? AppColors.primaryColor.withOpacity(0.2)
                            : Colors.white,
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Row(
                            children: [
                              Text(" Size : ${e?.measurementvalue ?? ''}  "),
                              Text(
                                  "Qty : ${e?.colorMeasurementVariationQuantity?.toString() ?? ''}"),
                            ],
                          ),
                        ),
                      ),
                    );
                  })?.toList() ??
                  [],
            ),
          )
        : const Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'No more sizes available',
                style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: AppColors.primarytextColor),
              ),
            ],
          );
  }
}
