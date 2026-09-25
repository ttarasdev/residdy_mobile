# set -euo pipefail
# 
# node -e "const p=require('./package.json'); process.exit(p && p.name==='residdy' ? 0 : 1)" || { echo "Run this inside residdy folder"; exit 1; }
# test -f app.json || { echo "app.json not found"; exit 1; }
# 
# rm -rf .expo .expo-shared ios android
# 
# rm -rf components constants hooks scripts README.md
# 
# rm -rf node_modules package-lock.json
# 
# rm -rf app
# mkdir -p app
# 
# cat > app/_layout.tsx <<'TSX'
# import { Stack } from "expo-router";
# 
# export default function RootLayout() {
#   return <Stack screenOptions={{ headerShown: false }} />;
# }
# TSX
# 
# cat > app/index.tsx <<'TSX'
# import { View, Text } from "react-native";
# 
# export default function Index() {
#   return (
#     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
#       <Text style={{ fontSize: 22, fontWeight: "600" }}>residdy</Text>
#     </View>
#   );
# }
# TSX
# 
# rm -rf assets
# mkdir -p assets/icons assets/logos
# 
# node - <<'NODE'
# const fs=require("fs");
# const p="app.json";
# const data=JSON.parse(fs.readFileSync(p,"utf8"));
# data.expo=data.expo||{};
# data.expo.name="residdy";
# data.expo.slug="residdy";
# data.expo.version=data.expo.version||"1.0.0";
# data.expo.orientation=data.expo.orientation||"portrait";
# data.expo.scheme=data.expo.scheme||"residdy";
# data.expo.userInterfaceStyle=data.expo.userInterfaceStyle||"automatic";
# data.expo.newArchEnabled=true;
# data.expo.plugins=["expo-router"];
# delete data.expo.icon;
# if (data.expo.android) delete data.expo.android.adaptiveIcon;
# if (data.expo.web) delete data.expo.web.favicon;
# fs.writeFileSync(p, JSON.stringify(data,null,2)+"\n");
# NODE
# 
# echo "reset done"
