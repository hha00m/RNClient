import settings from "../config/settings";
import { Share, Clipboard } from "react-native";

//================================================
export const onShare = async (item) => {
  //item.path
  try {
    const result = await Share.share({
      message: `${settings.apiUrl}/../../dash/invoice/${item.path}`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert("تم الاغاء");
  }
};

//================================================
export const handleCopy = (item) => {
  Clipboard.setString(
    `رقم الوصل: (${item.order_no}) \nالاسم: ${
      item.customer_name ? item.customer_name : ""
    } - (${item.client_phone})\n العنوان (${item.city} - ${
      item.town
    })\nالصفحة: (${item.store_name})\n حالة الطلب: (${item.status_name})\n${
      item.t_note ? item.t_note : ""
    }المبلغ: (${item.price})\n المندوب (${
      item.driver_phone ? item.driver_phone : ""
    })`
  );
  const msg = "تم نسخ معلومات الطلب";
};
//================================================
