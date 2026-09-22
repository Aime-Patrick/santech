import 'dart:io';
import 'package:feli_express/functions/Apis/profile.api.dart';
import 'package:feli_express/services/storage/local-storage.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class ImagePickerDialog extends StatefulWidget {
  final Function(File) onImagePicked;

  ImagePickerDialog({required this.onImagePicked});

  @override
  _ImagePickerDialogState createState() => _ImagePickerDialogState();
}

class _ImagePickerDialogState extends State<ImagePickerDialog> {
  File? _selectedImage;
  bool isUpdating = false;
  LocalStorageService localStorageService = LocalStorageService();

  late String token;

  @override
  void initState() {
    super.initState();
    localStorageService.getToken().then((value) {
      setState(() {
        token = value ?? '';
      });
    });
  }

  @override
  void dispose() {
    super.dispose();
  }

  Future<void> _pickImageFromGallery() async {
    final pickedFile =
        await ImagePicker().pickImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      setState(() {
        _selectedImage = File(pickedFile.path);
        isUpdating = true;
      });
      widget.onImagePicked(_selectedImage!);
    } else {
      setState(() {
        isUpdating = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      clipBehavior: Clip.none,
      backgroundColor: Colors.grey[200],
      title: Text(
        isUpdating ? 'Update profile' : 'Click to upload',
        style: TextStyle(
          color: AppColors.primaryColor,
          fontSize: 16,
          fontWeight: FontWeight.bold,
        ),
      ),
      content: SizedBox(
        height: 200,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                // backgroundColor: AppColors.primaryColor,

                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(5),
                ),
              ),
              child: Text(
                'Choose image from gallery',
                style: TextStyle(
                    color: AppColors.primaryColor,
                    fontSize: 14,
                    fontWeight: FontWeight.bold),
              ),
              onPressed: () async {
                setState(() {
                  isUpdating = true;
                });
                await _pickImageFromGallery();
              },
            ),
            _selectedImage != null
                ? Container(
                    decoration:
                        BoxDecoration(borderRadius: BorderRadius.circular(10)),
                    child: Image.file(
                      _selectedImage!,
                      width: 100,
                      height: 100,
                      fit: BoxFit.cover,
                    ),
                  )
                : Container(
                    child: Text("No image selected"),
                  ),
          ],
        ),
      ),
      actions: <Widget>[
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            TextButton(
              child: const Text(
                'Close',
                style: TextStyle(color: Colors.red),
              ),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            if (isUpdating)
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(5),
                  ),
                ),
                child: Text(
                  'Upload',
                  style: TextStyle(
                    color: AppColors.primaryColor,
                  ),
                ),
                onPressed: () async {
                  // Your upload logic here
                  // Navigator.of(context).pop();

                  try {
                    await updateProfileImage(_selectedImage!, token, context)
                        .then((value) => {
                              setState(() {
                                isUpdating = false;
                              }),
                              Navigator.of(context).pop(),
                            });
                  } catch (e) {
                    setState(() {
                      isUpdating = false;
                      // Navigator.pushNamed(context, '/product_page');
                    });
                  }
                },
              ),
          ],
        ),
      ],
    );
  }
}
