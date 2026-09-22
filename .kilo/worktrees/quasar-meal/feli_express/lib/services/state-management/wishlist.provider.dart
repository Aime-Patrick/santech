import "package:feli_express/models/product.model.dart";
import 'package:feli_express/services/storage/local-storage.dart';
import "package:flutter/material.dart";

class WishlistProvider extends ChangeNotifier {
  List<Product> _items = [];
  final LocalStorageService _localStorageService = LocalStorageService();

  WishlistProvider() {
    _loadWishlist();
  }

  int get totalPrice => _items.length * 42;
  get items => _items.length;
  get allItems => _items;

  List<Product> get wishlist => _items;

  void addProduct(Product item) {
    // Check if the item is not already in the wishlist before adding
    if (!_items.contains(item)) {
      _items.add(item);
      _saveWishlist();
      notifyListeners();
    }
  }

  void removeProduct(Product item) {
    _items.remove(item);
    _saveWishlist();
    notifyListeners();
  }
 Future<void> _loadWishlist() async {
    List<dynamic>? wishlistJson = await _localStorageService.loadWishlist();
    if (wishlistJson != null) {
      _items = wishlistJson.map((item) => Product.fromJson(item)).toList();
      notifyListeners();
    }
  }

  Future<void> _saveWishlist() async {
    List<dynamic> wishlistJson = _items.map((item) => item.toJson()).toList();
    await _localStorageService.saveWishlist(wishlistJson);
  }
  }