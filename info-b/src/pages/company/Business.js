import { business, partner, privat } from "./bsns";
import img from "../../resources/images/main/partner.png";
import user from "../../resources/images/main/users.png";
function Business(props) {
  return (
    <div className="mt-10 mx-52">
      <div className="">
        <h1 className="font-bold text-3xl text-start flex gap-2 items-center">
          <img src={img} className="w-14" />
          고객사
        </h1>
        <div className="flex flex-col mt-10">
          <h1 className="font-bold text-xl text-start">공공분야 주요고객</h1>
          <div className="mt-2">
            <ul className="flex flex-wrap gap-2">
              {business.map((item, index) => (
                <li key={index}>
                  <a href={item.href} target="_blank" rel="">
                    <img
                      src={item.img}
                      className="border border-gray-300 w-48 h-16 rounded-md "
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h1 className="text-start text-xl font-bold mt-5">
            민간분야 주요고객
          </h1>
          <div className="mt-2">
            <ul className="flex flex-wrap gap-2">
              {privat.map((item) => (
                <li key={item.id}>
                  <a href={item.href} target="_blank" rel="">
                    <img
                      src={item.img}
                      className="border border-gray-300 w-48 h-16 rounded-md"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-12 mb-40">
        <h1 className="text-3xl font-bold text-start  flex gap-2 items-center">
          <img src={user} className="w-14" />
          파트너
        </h1>
        <div className="mt-2">
          <ul className="flex flex-wrap gap-2">
            {partner.map((item) => (
              <li key={item.id}>
                <a href={item.href} target="_blank" rel="">
                  <img
                    src={item.img}
                    className="border border-gray-300 w-48 h-16 rounded-md"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Business;
