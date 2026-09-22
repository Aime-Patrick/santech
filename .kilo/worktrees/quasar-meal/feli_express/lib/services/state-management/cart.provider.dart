import 'package:feli_express/models/cart.model.dart';
import 'package:feli_express/models/product.model.dart';
import 'package:flutter/material.dart';

class CartProvider extends ChangeNotifier {
  List<CartItem> _cartItems = [];
  List<CartItem> get cartItems => _cartItems;

  double get totalPrice => _cartItems.fold(
      0.0, (total, item) => total + (item.discountedPrice * item.quantity));

  int get totalItems => _cartItems.fold(0, (sum, item) => sum + item.quantity);

  void addToCart(Product product, String? color, String? size, String? image) {
    String productId = product.id;
    int itemIndex = _cartItems.indexWhere((element) => element.id == productId);

    if (itemIndex != -1) {
      if (_cartItems[itemIndex].quantity < product.stockQuantity) {
        _cartItems[itemIndex].quantity += 1;
      } else {
        print('No more stock available for this product');
      }
    } else {
      if (product.stockQuantity > 0) {
        _cartItems.add(
          CartItem(
            id: productId,
            name: product.name,
            price: product.price,
            image: image != null
                ? image
                : product.productImages?.productThumbnail.url ?? '',
            quantity: 1,
            stockQuantity: product.stockQuantity,
            discountPercentage: product.discountPercentage,
            seller: product.seller,
            color: color,
            size: size,
          ),
        );
      } else {
        print('No more stock available for this product');
      }
    }
    notifyListeners();
  }

  void removeFromCart(CartItem item) {
    _cartItems.remove(item);
    notifyListeners();
  }

  bool increaseQuantityByCart(CartItem item) {
    int itemIndex = _cartItems.indexWhere((element) => element.id == item.id);

    if (itemIndex != -1 &&
        _cartItems[itemIndex].quantity < _cartItems[itemIndex].stockQuantity) {
      _cartItems[itemIndex].quantity += 1;
      notifyListeners();
      return true;
    }

    return false;
  }

  void decreaseQuantityByCart(CartItem item) {
    int itemIndex = _cartItems.indexWhere((element) => element.id == item.id);

    if (itemIndex != -1 && _cartItems[itemIndex].quantity > 1) {
      _cartItems[itemIndex].quantity -= 1;
    } else if (itemIndex != -1 && _cartItems[itemIndex].quantity == 1) {
      _cartItems.removeAt(itemIndex);
    }

    notifyListeners();
  }

  int totalSimilarItems(String id) {
    int total = 0;
    for (var item in _cartItems) {
      if (item.id == id) {
        total += item.quantity;
      }
    }
    return total;
  }

  void removeAt(int index) {
    _cartItems.removeAt(index);
    notifyListeners();
  }

  void removeAll() {
    _cartItems.clear();
    notifyListeners();
  }

  int getQuantity(String productId) {
    int itemIndex = _cartItems.indexWhere((element) => element.id == productId);

    if (itemIndex != -1) {
      return _cartItems[itemIndex].quantity;
    } else {
      return 0;
    }
  }

  String getCartItemColor(String productId) {
    int itemIndex = _cartItems.indexWhere((element) => element.id == productId);

    if (itemIndex != -1) {
      return _cartItems[itemIndex].color ?? '';
    } else {
      return '';
    }
  }

  String getCartItemSize(String productId) {
    int itemIndex = _cartItems.indexWhere((element) => element.id == productId);

    if (itemIndex != -1) {
      return _cartItems[itemIndex].size ?? '';
    } else {
      return '';
    }
  }
}
