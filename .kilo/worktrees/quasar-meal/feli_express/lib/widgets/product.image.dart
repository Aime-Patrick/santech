import 'package:feli_express/models/product.model.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:flutter/material.dart';

Widget ProductImage(
    BuildContext context, Product product, Function(String) onImageSelected) {
  String selectedColor = '';
  String selectedImage = '';

  //  final Function(String) onImageSelected;

  return product?.productImages?.otherImages != null &&
          product.productImages!.otherImages!.isNotEmpty
      ? SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: product.productImages!.otherImages?.map((e) {
                  return Column(
                    children: [
                      GestureDetector(
                        onTap: () {
                          selectedColor = e!.id ?? '';
                          selectedImage = e!.url ?? '';

                          onImageSelected(selectedImage);
                        },
                        child: Container(
                          margin: EdgeInsets.fromLTRB(8.0, 0.0, 8.0, 0.0),
                          decoration: BoxDecoration(
                            color: AppColors.textcolor,
                            shape: BoxShape.rectangle,
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.1),
                                blurRadius: 8,
                                spreadRadius: 5,
                              )
                            ],
                          ),
                          child: e?.url != null
                              ? Image.network(
                                  '${e!.url}',
                                  fit: BoxFit.cover,
                                  height: 50,
                                  width: 50,
                                )
                              : SizedBox(),
                        ),
                      ),
                    ],
                  );
                })?.toList() ??
                [],
          ),
        )
      : SizedBox(height: 0);
}
