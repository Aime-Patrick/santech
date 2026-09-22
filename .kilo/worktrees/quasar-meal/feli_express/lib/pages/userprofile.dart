// import 'dart:io';

// import 'package:feli_express/functions/Apis/profile.api.dart';
// import 'package:feli_express/services/storage/local-storage.dart';
// import 'package:feli_express/utils/colors.dart';
// import 'package:flutter/material.dart';
// import 'package:flutter/widgets.dart';

// import 'package:image_picker/image_picker.dart';

// class UserProfilePage extends StatefulWidget {
//   final user;

//   UserProfilePage({
//     super.key,
//     required this.user,
//   });
//   @override
//   State<UserProfilePage> createState() => _UserProfilePageState();
// }

// class _UserProfilePageState extends State<UserProfilePage> {
//   LocalStorageService localStorageService = LocalStorageService();

//   // late dynamic user = '';

//   late String token;

//   File? selectedImage;

//   var imageUrl;
//   bool isSuccess = false;
//   bool isUpdating = false;

//   @override
//   void initState() {
//     super.initState();
//     localStorageService.getToken().then((value) {
//       setState(() {
//         token = value;
//       });
//     });
//   }

//   @override
//   void dispose() {
//     super.dispose();
//   }

//   Future<void> _pickImageFromGallery() async {
//     final pickedFile =
//         await ImagePicker().pickImage(source: ImageSource.gallery);
//     if (pickedFile != null) {
//       setState(() {
//         selectedImage = File(pickedFile.path);
//         isUpdating = true;
//       });

//       print("pickedFile from gallery: $selectedImage");
//     } else {
//       setState(() {
//         isUpdating = false;
//       });
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text('User Profile'),
//       ),
//       body: ListView(
//         children: <Widget>[
//           Container(
//             child: Column(
//               children: [
//                 Stack(
//                   children: [
//                     Container(
//                       height: 200,
//                       decoration: BoxDecoration(
//                         color: Colors.white,
//                         image: DecorationImage(
//                           image: NetworkImage(
//                             "${widget.user['profileImageUrl']}",
//                           ),
//                           fit: BoxFit.cover,
//                         ),
//                       ),
//                     ),
//                     Positioned(
//                       bottom: 0,
//                       // left: 20,

//                       left: 0,
//                       right: 0,
//                       child: Row(
//                         mainAxisAlignment: MainAxisAlignment.center,
//                         crossAxisAlignment: CrossAxisAlignment.center,
//                         children: [
//                           Container(
//                             width: 150,
//                             height: 150,
//                             decoration: BoxDecoration(
//                               borderRadius: BorderRadius.circular(100),
//                               border: Border.all(
//                                 color: AppColors.primarytextColor,
//                                 width: 2,
//                               ),
//                               color: AppColors.primaryColor,
//                               image: DecorationImage(
//                                 image: NetworkImage(
//                                   "${widget.user['profileImageUrl']}}",
//                                 ),
//                                 fit: BoxFit.cover,
//                               ),
//                             ),
//                           ),
//                         ],
//                       ),
//                     ),
//                   ],
//                 ),
//                 SizedBox(height: 5),
//                 Padding(
//                   padding: const EdgeInsets.only(left: 18.0),
//                   child: Row(
//                     mainAxisAlignment: MainAxisAlignment.center,
//                     children: [
//                       Text("Name : "),
//                       Text(
//                         "${widget.user['firstName']}",
//                         style: TextStyle(
//                           color: Colors.black,
//                           fontFamily: 'Roboto',
//                           fontSize: 16,
//                           fontWeight: FontWeight.w500,
//                         ),
//                       ),
//                       Text(
//                         " ${widget.user['lastName']}",
//                         style: TextStyle(
//                           color: Colors.black,
//                           fontFamily: 'Roboto',
//                           fontSize: 16,
//                           fontWeight: FontWeight.w400,
//                         ),
//                       ),
//                     ],
//                   ),
//                 ),
//                 Row(
//                   mainAxisAlignment: MainAxisAlignment.center,
//                   children: [
//                     Text("Email : "),
//                     Text(
//                       "${widget.user['email']} ",
//                       style: TextStyle(
//                         color: Colors.black,
//                         fontFamily: 'Roboto',
//                         fontSize: 16,
//                         fontWeight: FontWeight.w400,
//                       ),
//                     ),
//                     // ListTile(
//                     //   title: Text("${widget.user['email']} "),
//                     //   subtitle: Text('${widget.user['role']}'),
//                     // ),
//                   ],
//                 ),
//                 SizedBox(height: 40),
//                 Padding(
//                   padding: const EdgeInsets.all(8.0),
//                   child: SizedBox(
//                     width: 300.0,
//                     child: Column(
//                       children: [
//                         // pick image from camera
//                         ElevatedButton(
//                           style: ElevatedButton.styleFrom(
//                             backgroundColor: AppColors.primaryColor,
//                             padding: const EdgeInsets.symmetric(
//                                 horizontal: 30, vertical: 5.0),
//                             shape: RoundedRectangleBorder(
//                               borderRadius: BorderRadius.circular(5),
//                             ),
//                           ),
//                           child: const Row(
//                             mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                             children: [
//                               Text("change profile image",
//                                   style: TextStyle(color: AppColors.textcolor)),
//                               Icon(Icons.chevron_right_outlined,
//                                   color: AppColors.textcolor)
//                             ],
//                           ),
//                           onPressed: () async {
//                             // Show the dialog with the loading state
//                             showDialog(
//                               context: context,
//                               builder: (BuildContext context) {
//                                 return AlertDialog(
//                                   clipBehavior: Clip.none,
//                                   backgroundColor: AppColors.secondaryColor,
//                                   title: Text(
//                                     isUpdating
//                                         ? 'Update profile'
//                                         : 'Click to upload',
//                                     style: TextStyle(
//                                       color: isSuccess
//                                           ? AppColors.primaryColor
//                                           : AppColors.primaryColor,
//                                       fontSize: 16,
//                                       fontWeight: FontWeight.bold,
//                                     ),
//                                   ),
//                                   content: SizedBox(
//                                     height: 200,
//                                     child: Column(
//                                       children: [
//                                         // if (isUpdating)
//                                         //   CircularProgressIndicator(),
//                                         TextButton(
//                                           child: Text(
//                                             'Choose image from gallery',
//                                             style: TextStyle(
//                                                 color: AppColors.primaryColor,
//                                                 fontSize: 14,
//                                                 fontWeight: FontWeight.bold),
//                                           ),
//                                           onPressed: () async {
//                                             setState(() {
//                                               isUpdating = true;
//                                             });
//                                             await _pickImageFromGallery();
//                                           },
//                                         ),
//                                         selectedImage != null
//                                             ? Container(
//                                                 decoration: BoxDecoration(
//                                                     borderRadius:
//                                                         BorderRadius.circular(
//                                                             10)),
//                                                 child: Image.file(
//                                                   selectedImage!,
//                                                   width: 100,
//                                                   height: 100,
//                                                   fit: BoxFit.cover,
//                                                 ),
//                                               )
//                                             : Container(
//                                                 child:
//                                                     Text("No image selected"),
//                                               ),
//                                       ],
//                                     ),
//                                   ),
//                                   actions: <Widget>[
//                                     TextButton(
//                                       child: const Text(
//                                         'Close',
//                                         style: TextStyle(
//                                             color: AppColors.errorcolor,
//                                             fontSize: 18,
//                                             fontWeight: FontWeight.bold),
//                                       ),
//                                       onPressed: () {
//                                         Navigator.of(context).pop();
//                                       },
//                                     ),
//                                     if (isUpdating)
//                                       TextButton(
//                                         child: Text(
//                                           'Upload',
//                                           style: TextStyle(
//                                               color: AppColors.primaryColor,
//                                               fontSize: 18,
//                                               fontWeight: FontWeight.bold),
//                                         ),
//                                         onPressed: () async {
//                                           try {
//                                             await updateProfileImage(
//                                                     selectedImage!, token)
//                                                 .then((value) => {
//                                                       setState(() {
//                                                         isSuccess = false;
//                                                         isUpdating = false;
//                                                       }),
//                                                       Navigator.of(context)
//                                                           .pop(),
//                                                       print(
//                                                           "value:onupdate $value")
//                                                     });
//                                           } catch (e) {
//                                             print("value:onupdate $e");
//                                             setState(() {
//                                               isSuccess = false;
//                                               isUpdating = false;
//                                             });
//                                           }
//                                         },
//                                       ),
//                                   ],
//                                 );
//                               },
//                             );
//                           },
//                         ),
//                         ElevatedButton(
//                             onPressed: () {},
//                             style: ElevatedButton.styleFrom(
//                               backgroundColor: AppColors.primaryColor,
//                               padding: const EdgeInsets.symmetric(
//                                   horizontal: 30, vertical: 5.0),
//                               shape: RoundedRectangleBorder(
//                                 borderRadius: BorderRadius.circular(5),
//                               ),
//                             ),
//                             child: const Row(
//                               mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                               children: [
//                                 Text("change password",
//                                     style:
//                                         TextStyle(color: AppColors.textcolor)),
//                                 Icon(
//                                   Icons.chevron_right_outlined,
//                                   color: AppColors.textcolor,
//                                 )
//                               ],
//                             ))
//                       ],
//                     ),
//                   ),
//                 ),
//               ],
//             ),
//           )
//         ],
//       ),
//     );
//   }
// }

import 'dart:io';
import 'package:feli_express/dialogs/update-profile-image.dart';
import 'package:feli_express/dialogs/update-user-profilenames.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:feli_express/services/storage/local-storage.dart';
import 'package:feli_express/utils/colors.dart';

class UserProfilePage extends StatefulWidget {
  final user;

  UserProfilePage({
    super.key,
    required this.user,
  });

  @override
  State<UserProfilePage> createState() => _UserProfilePageState();
}

class _UserProfilePageState extends State<UserProfilePage> {
  LocalStorageService localStorageService = LocalStorageService();
  late String token;
  File? selectedImage;
  bool isSuccess = false;
  bool isUpdating = false;

  @override
  void initState() {
    super.initState();
    localStorageService.getToken().then((value) {
      setState(() {
        token = value ?? '';
      });
    });
  }

  void _handleImagePicked(File image) {
    setState(() {
      selectedImage = image;
      isUpdating = false;
    });
  }

  File? _selectedImage;

  Future<void> _pickImageFromGallery() async {
    final pickedFile =
        await ImagePicker().pickImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      setState(() {
        _selectedImage = File(pickedFile.path);
      });
      print("pickedFile from gallery: $_selectedImage");
    } else {
      setState(() {
        // Handle the case when no image is selected
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('User Profile'),
      ),
      body: ListView(
        children: <Widget>[
          Container(
            child: Column(
              children: [
                Container(
                  child: Column(
                    children: [
                      Stack(
                        clipBehavior:
                            Clip.none, // Allow the overflow to be visible
                        children: [
                          Container(
                            height: 200,
                            decoration: BoxDecoration(
                              color: Colors.white,
                              image: DecorationImage(
                                image: _selectedImage != null
                                    ? FileImage(_selectedImage!)
                                    : NetworkImage(
                                            "${widget.user['profileImageUrl']}")
                                        as ImageProvider,
                                fit: BoxFit.cover,
                              ),
                            ),
                          ),
                          Positioned(
                            bottom: -75, // Move the image up by half its height
                            left: 0,
                            right: 0,
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Container(
                                  width: 150,
                                  height: 150,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(100),
                                    border: Border.all(
                                      color: AppColors.primaryColor,
                                      width: 6,
                                    ),
                                    color: AppColors.primaryColor,
                                    image: DecorationImage(
                                      image: _selectedImage != null
                                          ? FileImage(_selectedImage!)
                                          : NetworkImage(
                                                  "${widget.user['profileImageUrl']}")
                                              as ImageProvider,
                                      fit: BoxFit.cover,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 80),
                Padding(
                  padding: const EdgeInsets.only(left: 18.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text("Name : "),
                      Text(
                        "${widget.user['firstName']}",
                        style: TextStyle(
                          color: Colors.black,
                          fontFamily: 'Roboto',
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      Text(
                        " ${widget.user['lastName']}",
                        style: TextStyle(
                          color: Colors.black,
                          fontFamily: 'Roboto',
                          fontSize: 16,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                    ],
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text("Email : "),
                    Text(
                      "${widget.user['email']} ",
                      style: TextStyle(
                        color: Colors.black,
                        fontFamily: 'Roboto',
                        fontSize: 16,
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 40),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: SizedBox(
                    width: 300.0,
                    child: Column(
                      children: [
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.primaryColor,
                            padding: const EdgeInsets.symmetric(
                                horizontal: 30, vertical: 5.0),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(5),
                            ),
                          ),
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text("change profile image",
                                  style: TextStyle(color: AppColors.textcolor)),
                              Icon(Icons.chevron_right_outlined,
                                  color: AppColors.textcolor)
                            ],
                          ),
                          // onPressed: () async {
                          //   showDialog(
                          //     context: context,
                          //     builder: (BuildContext context) {
                          //       return ImagePickerDialog(
                          //         onImagePicked: _handleImagePicked,
                          //       );
                          //     },
                          //   );
                          // },

                          onPressed: () async {
                            showDialog(
                                context: context,
                                builder: (BuildContext context) {
                                  return ImagePickerDialog(
                                    onImagePicked: (File image) {
                                      setState(() {
                                        _selectedImage = image;
                                      });
                                    },
                                  );
                                });
                          },
                        ),
                        ElevatedButton(
                          onPressed: () async {
                            showDialog(
                                context: context,
                                builder: (BuildContext context) {
                                  return UpdateUserNames();
                                });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.primaryColor,
                            padding: const EdgeInsets.symmetric(
                                horizontal: 30, vertical: 5.0),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(5),
                            ),
                          ),
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text("change user names",
                                  style: TextStyle(color: AppColors.textcolor)),
                              Icon(
                                Icons.chevron_right_outlined,
                                color: AppColors.textcolor,
                              )
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
