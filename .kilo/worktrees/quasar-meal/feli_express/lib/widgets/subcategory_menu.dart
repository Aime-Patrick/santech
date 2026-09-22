import 'package:feli_express/models/subcategory.model.dart';
import 'package:flutter/material.dart';

void SubCategoryMenu(BuildContext context, List<SubCategory> subCategories) {
  print('SubCategoryMenu received the following subcategories: $subCategories');

  if (subCategories.isNotEmpty) {
    showMenu(
      context: context,
      position: RelativeRect.fromDirectional(
          textDirection: TextDirection.ltr,
          start: 0.0,
          top: 150.0,
          end: 30.0,
          bottom: 40.0),
      items: subCategories.map((SubCategory subCategory) {
        return PopupMenuItem(
          child: Text(subCategory.name),
          value: subCategory,
        );
      }).toList(),
    );
  } else {
    print('SubCategoryMenu received an empty subCategories list');
  }
}