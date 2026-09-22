import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/elevatedbutton.dart';
import 'package:feli_express/widgets/textformfield.dart';
import 'package:flutter/material.dart';


class CodeConfirmation extends StatefulWidget {
  const CodeConfirmation({super.key});

  @override
  State<CodeConfirmation> createState() => _CodeConfirmationState();
}

class _CodeConfirmationState extends State<CodeConfirmation> {
  final TextEditingController passwordController = TextEditingController();
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();
  bool _isLoading = false;
  void setLoading(bool loading) {
    setState(() {
      _isLoading = loading;
    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.AppColor,
      body: Container(
        padding: const EdgeInsets.only(left: 60, top: 60, right: 60, bottom: 10),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            const Image(
              image: AssetImage('assets/images/Feli 1.png'),
              width: 200,
              height: 200,
            ),
            const SizedBox(height: 20),
            const Text(
              'Code Confirmation',
              style: TextStyle(
                color: AppColors.primarytextColor,
                fontSize: 15,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 20),
            MyTextFormField(context, 
                TextInputAction.next, 
                '', 
                TextInputType.visiblePassword, 
                false, 
                 (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a verification code';
                  } else if (value.length < 6) {
                    return 'Verification code must be at least 6 characters';
                  }
                 }, 
                passwordController, 
                ''),
            const SizedBox(height: 20),
            MyElevatedButton(
              context,
              40.0,
              'Send',
              () {
                Navigator.pushNamed(context, '/password_confirmation');
              },
              false,
              setLoading,
            ),
          ],
        ),
      ),
    );
  }
}