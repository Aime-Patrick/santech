import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/companylogo.dart';
import 'package:feli_express/widgets/elevatedbutton.dart';
import 'package:feli_express/widgets/textformfield.dart';
import 'package:flutter/material.dart';


class PasswordConfirmation extends StatefulWidget {
  const PasswordConfirmation({super.key});

  @override
  State<PasswordConfirmation> createState() => _PasswordConfirmationState();
}

class _PasswordConfirmationState extends State<PasswordConfirmation> {
  @override
  Widget build(BuildContext context) {
    final GlobalKey<FormState> formKey = GlobalKey<FormState>();
    final TextEditingController emailController = TextEditingController();
    final TextEditingController passwordController = TextEditingController();
    bool _isLoading = false;
    void setLoading(bool loading) {
      setState(() {
        _isLoading = loading;
      });
    }
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            companyLogo(
              context
              ),
            const SizedBox(height: 10),
            const Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.login,
                ),
                SizedBox(width: 10),
                Text('Reset Password',
                  style: TextStyle(
                    color: AppColors.primarytextColor,
                    fontSize: 15,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
           
            const SizedBox(height: 30),
            Container(
              padding: const EdgeInsets.only(left: 60, top: 60, right: 60, bottom: 10),
              child: Form(
                key: formKey,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                   const Text('Enter new password',
                      style: TextStyle(
                        color: AppColors.primarytextColor,
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 10),
                    MyTextFormField(context, 
                  TextInputAction.next, 
                  '', 
                  TextInputType.visiblePassword, 
                  true, 
                  (value) {
                    if (value == null || value.isEmpty) {
                      return "Please enter a new password";
                    } else if (value.length < 10) {
                      return 'Password must be at least 10 characters';
                    }
                    return null;
                  }, 
                  passwordController, 
                  ''),
                    const SizedBox(height: 10),
                    const Text('Confirm new password',
                      style: TextStyle(
                        color: AppColors.primarytextColor,
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 10),
                    MyTextFormField(context, 
                  TextInputAction.next, 
                  '', 
                  TextInputType.visiblePassword, 
                  true, 
                   (value) {
                    if (value == null || value.isEmpty) {
                      return "Please confirm your new password";
                    } else if (value.length < 8) {
                      return 'Password must be at least 8 characters';
                    }
                    return null;
                  }, 
                  passwordController, 
                  'confirm password'),
                    const SizedBox(height: 28),
                   MyElevatedButton(
                    context, 40.0,
                    'Save', () {
                     // Navigator.pushNamed(context, '/login');
                    }, 
                    false,
                    setLoading,
                    ),
                  ],
                )
                ),
            )
          ],
        ),
      ),
    );
  }
}