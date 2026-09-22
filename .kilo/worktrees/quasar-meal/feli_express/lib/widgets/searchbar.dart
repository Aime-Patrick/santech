import 'package:feli_express/models/product.model.dart';
import 'package:feli_express/pages/related_product_page.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:flutter/material.dart';

class SearchBarWidget extends StatefulWidget {
  final List<Product> product2;

  const SearchBarWidget({Key? key, required this.product2});
  @override
  _SearchBarWidgetState createState() => _SearchBarWidgetState();
}

class _SearchBarWidgetState extends State<SearchBarWidget> {
  final TextEditingController _searchController = TextEditingController();
  ValueNotifier<List<Product>> filteredProducts =
      ValueNotifier<List<Product>>([]);
  final _formKey = GlobalKey<FormState>();
  OverlayEntry? overlayEntry;

  @override
  void dispose() {
    super.dispose();
    _searchController.dispose();
    overlayEntry?.remove();
  }

  @override
  void initState() {
    super.initState();
    filteredProducts.value = widget.product2;
  }

  void filterSearchResults(String query) {
    List<Product> searchResult = [];
    if (query.isNotEmpty) {
      searchResult = widget.product2
          .where((product) =>
              product.name.toLowerCase().contains(query.toLowerCase()))
          .toList();
    }
    setState(() {
      filteredProducts.value = searchResult;
    });
    print(
        'filterSearchResults called, filteredProducts: ${filteredProducts.value}');

    if (query.isNotEmpty) {
      showSearchResults();
    } else {
      hideSearchResults();
    }
  }

  void showSearchResults() {
    hideSearchResults(); // Ensure any existing overlay is removed

    overlayEntry = OverlayEntry(
      builder: (context) => Positioned(
        top: 100, // Adjust this value to position the search results
        left: 40,
        right: 40,
        child: Material(
          borderRadius: BorderRadius.circular(15),
          elevation: 4.0,
          child: Container(
            height: 300,
            child: filteredProducts.value.isEmpty
                ? const Center(
                    child: Text(
                      'No results found',
                      style: TextStyle(
                          color: AppColors.primaryColor,
                          fontSize: 16,
                          fontWeight: FontWeight.w800),
                    ),
                  )
                : ListView.builder(
                    itemCount: filteredProducts.value.length,
                    itemBuilder: (context, index) {
                      final product = filteredProducts.value[index];
                      return Card(
                        child: ListTile(
                          leading: Container(
                            width: 60,
                            height: 80,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(10),
                              image: DecorationImage(
                                image: NetworkImage(
                                  product.productImages!.productThumbnail.url
                                      .toString(),
                                ),
                                fit: BoxFit.cover,
                              ),
                            ),
                          ),
                          title: Text(product.name),
                          onTap: () {
                            hideSearchResults();
                            Navigator.pop(context);
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => RelatedProductsScreen(
                                      selectedProductID: product.id!)),
                            );
                          },
                        ),
                      );
                    },
                  ),
          ),
        ),
      ),
    );

    Overlay.of(context)?.insert(overlayEntry!);
  }

  void hideSearchResults() {
    if (overlayEntry != null && overlayEntry!.mounted) {
      overlayEntry?.remove();
      overlayEntry = null;
    }
  }

  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    return Container(
      height: 37,
      decoration: BoxDecoration(
          color: AppColors.AppColor,
          borderRadius: BorderRadius.circular(10),
          boxShadow: [
            BoxShadow(
              color: AppColors.primarytextColor.withOpacity(0.2),
              blurRadius: 10,
              offset: const Offset(1, 1),
            ),
          ]),
      child: TextFormField(
        key: _formKey,
        controller: _searchController,
        textAlign: TextAlign.center,
        style: TextStyle(
          color: AppColors.primarytextColor,
        ),
        decoration: InputDecoration(
          hintText: 'Search for products',
          //filled: true,
          hintStyle: const TextStyle(
            color: AppColors.secondaryColor,
            fontSize: 14,
          ),
          border: InputBorder.none,
          focusedBorder: InputBorder.none,

          suffixIcon: Container(
            width: 70,
            decoration: const BoxDecoration(
              color: AppColors.primarytextColor,
              borderRadius: BorderRadius.only(
                topRight: Radius.circular(10),
                bottomRight: Radius.circular(10),
              ),
            ),
            child: const Center(
              child: Text(
                'search',
                style: TextStyle(
                  color: AppColors.textcolor,
                  fontSize: 13,
                ),
              ),
            ),
          ),
        ),
        onChanged: (value) {
          filterSearchResults(value);
          print(filteredProducts.value.length);
          if (filteredProducts.value.isNotEmpty) {
            print(filteredProducts.value[0].name);
          }
        },
      ),
    );
  }
}
