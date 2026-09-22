import 'package:feli_express/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';

Widget MyElevatedButton(
    BuildContext context, height, text, click, isloading, Function setLoading) {
  final _formKey = GlobalKey<FormState>();
  // bool _isLoading = false;
  return SizedBox(
      // height: 40.0,
      width: 280,
      child: ElevatedButton(
        onPressed: () async {
          click();
          if (_formKey.currentState != null &&
              _formKey.currentState!.validate()) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Processing Data')),
            );
            setLoading(true);
            await Future.delayed(const Duration(seconds: 2));
            setLoading(false);
          }
        },
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primaryColor,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(5))),
        ),
        child: isloading
            // ? CircularProgressIndicator(
            //     color: AppColors.primaryColor,
            //   )

            ? Transform.scale(
                scale: 0.3,
                child: Container(
                    height: 20.0,
                    child: Center(
                        child: LoadingAnimationWidget.prograssiveDots(
                      color: AppColors.AppColor,
                      size: 200,
                    ))))
            : Text(
                text,
                style: TextStyle(
                  color: AppColors.textcolor,
                  fontSize: 15,
                ).copyWith(
                  fontFamily: 'Roboto',
                  fontWeight: FontWeight.bold,
                ),
              ),
      ));
}
