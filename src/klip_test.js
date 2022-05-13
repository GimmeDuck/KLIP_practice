import axios from "axios";
import { prepare, request, getResult, getCardList } from 'klip-sdk';
const A2P_API_PREPARE_URL = "https://a2a-api.klipwallet.com/v2/a2a/prepare";
const APP_NAME = "KLAYTN_REACT-TEST";
const [from] = useState("0x00000000000000000000000000000");
const to = '0x38596eD0dceaC58632bCf8BD92B5af3854d6A768';
const amount = '1';


const getKlipAccessUrl = (method, request_key) => {
  if (method === "QR") {
    return `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
  }
  return `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
};

//지갑 주소 수집
export const getAddress = (setQrvalue, callback) => {
    axios
      .post(A2P_API_PREPARE_URL, {
        bapp: {
          name: APP_NAME,
        },
        type: "auth",
      })
      .then((response) => {
        const { request_key } = response.data;
        setQrvalue(getKlipAccessUrl("QR", request_key));
        let timerId = setInterval(() => {
          axios
            .get(
              `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
            )
            .then((res) => {
              if (res.data.result) {
                console.log(`[Result] ${JSON.stringify(res.data.result)}`);
                callback(res.data.result.klaytn_address);
                clearInterval(timerId);
                setQrvalue("DEFAULT");
              }
            });
        }, 1000);
      });
  };

  //klay 전송
  export const send_klay = (setMyAddress) => {
    const res = await prepare.sendKLAY({ setMyAddress, from, to, amount })
    if (res.err) {
      console.log("klay 전송 오류")
    } else if (res.request_key) {
      return res.request_key;
    }
  };
  