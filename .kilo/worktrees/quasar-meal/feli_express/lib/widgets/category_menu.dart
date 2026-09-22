import 'package:feli_express/models/productclass.model.dart' as pc;
import 'package:flutter/material.dart';

void CategoryMenu(BuildContext context, List<pc.Category> categories) {
  int _selectedProductClassIndex = 0;
  var _selectedCategories = categories[0].subCategories != null 
  ? List<pc.Category?>.from(categories[0].subCategories!.map((e) => e)).cast<pc.Category?>() 
  : [];
  if (Navigator.canPop(context)) Navigator.pop(context);
  showMenu(
    context: context,
    position: RelativeRect.fromDirectional(
        textDirection: TextDirection.rtl,
        start: 0.0,
        top: 150.0,
        end: 30.0,
        bottom: 40.0),
    items: categories.asMap().entries.map((entry) {
  int index = entry.key;
  pc.Category category = entry.value;
  return PopupMenuItem(
    child: ListTile(
      title: Text('${category.name}'),
      onTap: () {
  int? selectedIndex = index;
  print('selectedIndex: $selectedIndex');
  print('categories.length: ${categories.length}');
  if (selectedIndex != null) {
    print('categories[selectedIndex].subCategories: ${categories[selectedIndex].subCategories}');
  }
  if (selectedIndex != null && selectedIndex < categories.length && categories[selectedIndex].subCategories != null) {
    // ...
  } else {
    print('No category selected or selected category does not exist');
    // Handle this case in your UI
  }
},
    ),
  );
}).toList(),
  );
}