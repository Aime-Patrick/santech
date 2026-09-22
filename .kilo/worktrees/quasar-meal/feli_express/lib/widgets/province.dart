// provinces.dart

class Province {
  final String name;
  final List<District> districts;

  Province(this.name, this.districts);
}

class District {
  final String name;
  final List<String> sectors;

  District(this.name, this.sectors);
}

List<Province> provinces = [
  Province('Kigali', [
    District('Gasabo', [
      'Bumbogo', 'Gatsata', 'Gikomero', 'Gisozi', 'Jabana', 'Jali', 'Kacyiru',
      'Kimihurura', 'Kimironko', 'Kinyinya', 'Ndera', 'Nduba', 'Remera', 
      'Rusororo', 'Rurunga',
    ]),
    District('Nyarugenge', [
      'Gitega', 'Kanyinya', 'Kigali', 'Kimisagara', 'Mageragere', 'Muhima', 'Nyakabanda',
      'Nyamirambo', 'Nyarugenge', 'Rwezamenyo',
    ]),
    District('Kicukiro', [
      'Gahanga', 'Gatenga', 'Gikondo', 'Kagarama', 'Kanombe', 'Kicukiro', 'Kigarama',
      'Masaka', 'Niboye', 'Nyarugunga',
    ]),
  ]),
  Province('Southern', [
    District('Huye', [
      'Gishamvu', 'Huye', 'Karama', 'Kigoma', 'Kinazi', 'Maraba', 'Mbazi',
      'Mukura', 'Ngoma', 'Ruhashya', 'Rusatira', 'Rwaniro', 'Simbi',
      'Tumba',
    ]),
    District('Gisagara', [
      'Gikonko', 'Gishubi', 'Kansi', 'Kabirizi', 'Kigembe', 'Mamba', 'Muganza',
      'Mugombwa', 'Mukingo', 'Musha', 'Ndora', 'Nyanza', 'Save',
    ]),
    District('Nyanza', [
      'Busasamana', 'Busoro', 'Cyabakamyi', 'Kibirizi', 'Kigoma', 'Mukingo', 'Muyira',
      'Ntyazo', 'Nyagisozi', 'Rwabicuma',
    ]),
    District('Nyaruguru', [
      'Busanze', 'Cyahinda', 'Kibeho', 'Kivu', 'Mata', 'Muganza', 'Munini',
      'Ngera', 'Ngoma', 'Nyabimata', 'Nyagisozi', 'Ruheru', 'Ruramba',
      'Rusenge',
    ]),
    District('Nyamagabe', [
      'Buruhukiro', 'Cyanika', 'Gasaka', 'Gatare', 'Kaduha', 'Kamegeri', 'Kibirizi',
      'Kibumbwe', 'Kitabi', 'Mbazi', 'Mugano', 'Musange', 'Musebeya',
      'Mushubi', 'Nkomane', 'Tare', 'Uwinkingi',
    ]),
    District('Muhanga', [
      'Cyeza', 'Kabacuzi', 'Kibangu', 'Kiyumba', 'Muhanga', 'Mushishiro', 'Nyabinoni',
      'Nyamabuye', 'Nyarusange', 'Rongi', 'Rugendabari', 'Shyogwe',
    ]),
    District('Kamonyi', [
      'Gacurabwenge', 'Karama', 'Kayenzi', 'Kayumbu', 'Mugina', 'Musambira', 'Ngamba',
      'Nyamiyaga', 'Nyarubaka', 'Rugarika', 'Rukoma', 'Runda',
    ]),
    District('Ruhango', [
      'Bweramana', 'Byimana', 'Kabagali', 'Kinazi', 'Kinihira', 'Mbuye', 'Mwendo',
      'Ntongwe', 'Ruhango',
    ]),
  ]),
  Province('Western', [
    District('Rusizi', [
      'Bugarama', 'Butare', 'Bweyeye', 'Gashonga', 'Giheke', 'Gihundwe', 'Gikundamvura',
      'Gitambi', 'Kamembe', 'Muganza', 'Mururu', 'Nkaka', 'Nkombo',
      'Nkungu', 'Nyakabuye', 'Nyakarenzo', 'Nzahaha','Rwimbogo',
    ]),
    District('Nyamasheke', [
      'Bushekeri', 'Bushenge', 'Cyato', 'Gihombo', 'Kagano', 'Kanjongo', 'Karambi',
      'Karengera', 'Kirimbi', 'Macuba', 'Mahembe', 'Nyabitekeri', 'Rangiro',
      'Ruharambuga', 'Shangi',
    ]),
    District('Karongi', [
      'Bwishyura', 'Gishari', 'Gishyita', 'Gitesi', 'Mubuga', 'Murambi', 'Murundi',
      'Mutuntu', 'Rubengera', 'Rugabano', 'Ruganda', 'Rwankuba', 'Twumba',
    ]),
    District('Rutsiro', [
      'Boneza', 'Gihango', 'Kigeyo', 'Kivumu', 'Manihira', 'Mukura', 'Murunda',
      'Musasa', 'Mushonyi', 'Mushubati', 'Nyabirasi', 'Ruhango', 'Rusebeya',
    ]),
    District('Rubavu', [
      'Bugeshi', 'Busasamana', 'Cyanzarwe', 'Gisenyi', 'Kanama', 'Kanzenze', 'Mudende',
      'Nyakiriba', 'Nyamyumba', 'Nyundo', 'Rubavu', 'Rugerero',
    ]),
    District('Ngororero', [
      'Bwira', 'Gatumba', 'Hindiro', 'Kabaya', 'Kageyo', 'Kavumu', 'Matyazo',
      'Muhanda', 'Muhororo', 'Ndaro', 'Ngororero', 'Nyange', 'Sovu',
    ]),
    District('Nyabihu', [
      'Bigogwe', 'Jenda', 'Jomba', 'Kabatwa', 'Karago', 'Kintobo', 'Mukamira',
      'Muringa', 'Rambura', 'Rugera', 'Rurembo', 'Shyira',
    ]),
  ]),
  Province('Northern', [
    District('Musanze', [
      'Busogo', 'Cyuve', 'Gacaca', 'Gashaki', 'Gataraga', 'Kimonyi', 'Kinigi',
      'Muhoza', 'Muko', 'Musanze', 'Nkotsi', 'Nyange', 'Remera',
      'Rwaza', 'Shingiro',
    ]),
    District('Gakenke', [
      'Busengo', 'Coko', 'Cyabingo', 'Gakenke', 'Gashenyi', 'Janja', 'Kamubuga',
      'Kamubuga', 'Karambo', 'Kivuruga', 'Mataba', 'Minazi', 'Mugunga',
      'Muhondo', 'Muyongwe', 'Muzo', 'Nemba', 'Ruli', 'Rusasa', 'Rushashi',
    ]),
    District('Rulindo', [
      'Base', 'Burega', 'Bushoki', 'Buyoga', 'Cyinzuzi', 'Cyungo', 'Kinihira',
      'Kisaro', 'Masoro', 'Mbogo', 'Murambi', 'Ngoma', 'Ntarabana',
      'Rukozo', 'Rusiga', 'Shyorongi', 'Tumba'
    ]),
    District('Gicumbi', [
      'Bukure', 'Bwisige', 'Byumba', 'Cyumba', 'Giti', 'Kageyo', 'Kaniga',
      'Manyagiro', 'Miyove', 'Mukarange', 'Muko', 'Mutete', 'Nyamiyaga',
      'Nyankenke', 'Rubaya', 'Rukomo', 'Rushaki', 'Rutare', 'Ruvune','Shangasha','Rwamiko'
    ]),
    District('Burera', [
      'Bungwe', 'Butaro', 'Cyanika', 'Cyeru', 'Gahunga', 'Gatebe', 'Gitovu',
      'Kagogo', 'Kinoni', 'Kinyababa', 'Kivuye', 'Nemba', 'Rugarama',
      'Rugengabari', 'Ruhunde', 'Rusarabuye', 'Rwerere'
    ]),
  ]),
  Province('Eastern', [
    District('Rwamagana', [
      'Fumbwe', 'Gahengeri', 'Gishali','Karenge','Kigabiro','Muhazi','Munyaga','Munyiginya',
      'Musha','Muyumbu','Mwulire','Nyakaliro','Nzige', 'Rubona',
    ]),
    District('Kayonza', [
      'Gahini', 'Kabare', 'Kabarondo', 'Mukarange', 'Murama', 'Murundi', 'Mwili',
      'Ndego', 'Nyamirama', 'Rukara', 'Ruramira', 'Rwinkwavu',
    ]),
    District('Gatsibo', [
      'Gasange', 'Gatsibo', 'Gitoki', 'Kabarore', 'Kageyo', 'Kiramuruzi', 'Kiziguro',
      'Muhura', 'Murambi', 'Ngarama', 'Nyagihanga', 'Remera', 'Rugarama',
      'Rwimbogo',
    ]),
    District('Nyagatare', [
      'Gatunda', 'Karama', 'Karangazi', 'Katabagemu', 'Kiyombe', 'Matimba', 'Mimuri',
      'Mukama', 'Musheri', 'Nyagatare', 'Rukomo', 'Rwempasha', 'Rwimiyaga',
      'Tabagwe',
    ]),
    District('Kirehe', [
      'Gahara', 'Gatore', 'Kigarama', 'Kigina', 'Kirehe', 'Mahama', 'Mpanga',
      'Musaza', 'Mushikiri', 'Nasho', 'Nyamugari', 'Nyarubuye',
    ]),
    District('Ngoma', [
      'Gashanda', 'Jarama', 'Karembo', 'Kazo', 'Kibungo', 'Mugesera', 'Murama',
      'Mutenderi', 'Remera', 'Rukira', 'Rukumberi', 'Rurenge', 'Sake',
      'Zaza',
    ]),
    District('Bugesera', [
      'Gashora', 'Juru', 'Kamabuye', 'Mareba', 'Mayange', 'Musenyi',
      'Mwogo', 'Ngeruka', 'Ntarama', 'Nyamata', 'Nyarugenge', 'Rilima',
      'Ruhuha', 'Rweru', 'Shyara'
    ]),
  ]),
];
