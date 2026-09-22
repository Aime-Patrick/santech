import 'package:feli_express/models/order2.model.dart';
import 'package:feli_express/services/state-management/order.provider.dart';
import 'package:feli_express/services/storage/local-storage.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/filterbutton.dart';
import 'package:feli_express/widgets/ordercard.dart';
import 'package:flutter/material.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:provider/provider.dart';

class OrdersPage extends StatefulWidget {
  final Map<String, dynamic> user;

  OrdersPage({super.key, required this.user});

  @override
  _OrdersPageState createState() => _OrdersPageState();
}

class _OrdersPageState extends State<OrdersPage> {
  List<Order2> orders = [];

  String filter = 'All';
  bool _isLoading = false;

  LocalStorageService localStorageService = LocalStorageService();
  late String token;

  var statusColors = {
    "awaits payment": "#FAD02E",
    "pending": "#F0690E",
    "processing": "#2E8B57",
    "shipped": "#008080",
    "delivered": "#006400",
    "cancelled": "#FF0000",
    "transaction failed": "#8B0000",
  };

  void logout() async {
    await localStorageService.clearAll().then((value) {
      Navigator.pushNamed(context, '/homepage');
    });
  }

  @override
  void initState() {
    super.initState();
    localStorageService.getToken().then((value) {
      if (value != null) {
        setState(() {
          _isLoading = true;
        });
        context
            .read<OrderProvider>()
            .fetchAndAddOrders(value)
            .then((value) => {
                  print("response on order screen"),
                  setState(() {
                    _isLoading = false;
                  })
                })
            .catchError((error) {
          setState(() {
            _isLoading = false;
          });
          if (error.toString().contains("User no longer exists")) {
            // Handle the error here
            logout();
          }
        });
      }
      setState(() {
        token = value ?? '';
      });
    });
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    orders = context.watch<OrderProvider>().orders;

    print("orders on orderscreen $orders");

    return Scaffold(
      appBar: AppBar(
        title: Text('Orders Status'),
        actions: [
          CircleAvatar(
            backgroundImage: NetworkImage(widget.user['profileImageUrl'] ?? ''),
          ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Padding(
                    padding: const EdgeInsets.fromLTRB(8.0, 0, 8.0, 0),
                    child: FilterButton(
                      label: 'All',
                      isSelected: filter == 'All',
                      onTap: () => setState(() => filter = 'All'),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(8.0, 0, 8.0, 0),
                    child: FilterButton(
                      label: 'Pending',
                      isSelected: filter == 'pending',
                      onTap: () => setState(() => filter = 'pending'),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(8.0, 0, 8.0, 0),
                    child: FilterButton(
                      label: 'Awaits Payment',
                      isSelected: filter == 'awaits payment',
                      onTap: () => setState(() => filter = 'awaits payment'),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(8.0, 0, 8.0, 0),
                    child: FilterButton(
                      label: 'Delivered',
                      isSelected: filter == 'delivered',
                      onTap: () => setState(() => filter = 'delivered'),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(8.0, 0, 8.0, 0),
                    child: FilterButton(
                      label: 'Cancelled',
                      isSelected: filter == 'cancelled',
                      onTap: () => setState(() => filter = 'cancelled'),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(8.0, 0, 8.0, 0),
                    child: FilterButton(
                      label: 'Transaction Failed',
                      isSelected: filter == 'transaction failed',
                      onTap: () =>
                          setState(() => filter = 'transaction failed'),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(8.0, 0, 8.0, 0),
                    child: FilterButton(
                      label: 'Processing',
                      isSelected: filter == 'processing',
                      onTap: () => setState(() => filter = 'processing'),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(8.0, 0, 8.0, 0),
                    child: FilterButton(
                      label: 'Shipped',
                      isSelected: filter == 'shipped',
                      onTap: () => setState(() => filter = 'shipped'),
                    ),
                  ),
                ],
              ),
            ),
          ),
          _isLoading
              ? Center(
                  child: SizedBox(
                    height: 400.0,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Transform.scale(
                            scale: 0.7,
                            child: Container(
                                height: 20.0,
                                child: Center(
                                    child:
                                        LoadingAnimationWidget.prograssiveDots(
                                  color: AppColors.primaryColor,
                                  size: 200,
                                )))),
                      ],
                    ),
                  ),
                )
              : Expanded(
                  child: ListView.builder(
                    itemCount: orders.length,
                    itemBuilder: (context, index) {
                      if (filter == 'All' || orders[index].status == filter) {
                        return OrderCard(order: orders[index]);
                      }

                      return SizedBox.shrink();
                    },
                  ),
                ),
        ],
      ),
    );
  }
}
