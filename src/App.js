var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from "react";
function App() {
    const [carriers, setCarriers] = useState([]);
    const [allCarriers, setAllCarriers] = useState([]);
    const [theme, setTheme] = useState('default');
    const [tcode, setTcode] = useState('04');
    const [tinvoice, setTinvoice] = useState('');
    const [tname, setTname] = useState('CJ대한통운');
    const [isBtn, setIsBtn] = useState(null);
    const [infoTracking, setInfoTracking] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isShow, setIsShow] = useState(false);
    const [error, setError] = useState('');
    const themeColor = {
        "default": {
            "back": "bg-indigo-500",
            "hover": "hover:bg-indigo-300",
            "active": "bg-indigo-400",
            "text": "text-indigo-500",
            "outline": "outline-indigo-300",
            "odd": "odd:bg-indigo-50",
            "after": "after:bg-indigo-500",
            "border": "border-indigo-300",
            "rgb": "#6366f1"
        },
        "salmon": {
            "back": "bg-[#FA8072]",
            "hover": "hover:bg-[#f85441]",
            "active": "bg-[#f96a59]",
            "text": "text-[#FA8072]",
            "outline": "outline-[#f85441]",
            "odd": "odd:bg-[#feefed]",
            "after": "after:bg-[#FA8072]",
            "border": "border-[#f85441]",
            "rgb": "#FA8072"
        },
        "blue": {
            "back": "bg-blue-500",
            "hover": "hover:bg-blue-300",
            "active": "bg-blue-400",
            "text": "text-blue-500",
            "outline": "outline-blue-300",
            "odd": "odd:bg-blue-50",
            "after": "after:bg-blue-500",
            "border": "border-blue-300",
            "rgb": "#3b82f6"
        }
    };
    const buttons = [
        { name: "기본", theme: "default" },
        { name: "살몬", theme: "salmon" },
        { name: "블루", theme: "blue" }
    ];
    useEffect(() => {
        const fetchData = () => __awaiter(this, void 0, void 0, function* () {
            setIsLoading(!isLoading);
            try {
                const res = yield fetch(`http://info.sweettracker.co.kr/api/v1/companylist?t_key=${process.env.REACT_APP_API_KEY}`);
                const data = yield res.json();
                setCarriers(data.Company);
                setAllCarriers(data.Company);
                setIsLoading(false);
            }
            catch (error) {
                console.log(error);
            }
        });
        fetchData();
    }, []);
    const selectCode = (BtnNumber, code, name) => {
        setIsBtn(BtnNumber);
        setTcode(code);
        setTname(name);
        const isInternational = BtnNumber === 2 ? 'true' : 'false';
        const filterCarriers = allCarriers.filter(e => e.International === isInternational);
        setCarriers(filterCarriers);
    };
    const blindNumber = (e) => {
        const value = e.target.value;
        const result = carriers.find((e) => e.Code === tcode);
        if (result) {
            if (result.International === "false") {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
            }
        }
        setTinvoice(value);
    };
    const PostSubmit = () => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setIsShow(false);
        setError('');
        try {
            const res = yield fetch(`https://info.sweettracker.co.kr/api/v1/trackingInfo?t_code=${tcode}&t_invoice=${tinvoice}&t_key=${process.env.REACT_APP_API_KEY}`);
            const data = yield res.json();
            if (data.firstDetail === null) {
                setError("데이터 없음");
                setIsLoading(false);
                return;
            }
            if (data.code === '104' || data.code === '105') {
                setError(data.msg);
            }
            else {
                setInfoTracking(data);
                setIsShow(true);
            }
            setIsLoading(false);
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }
    });
    const PostListName = ["상품인수", "상품이동중", "배송지도착", "배송출발", "배송완료"];
    return (<>
            {isLoading &&
            <div className="fixed w-full h-full bg-black/50 top-0 left-0 z-50">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <svg width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                <g transform="rotate(0 50 50)">
                                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`${themeColor[theme].rgb}`}>
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
                                    </rect>
                                    </g><g transform="rotate(30 50 50)">
                                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`${themeColor[theme].rgb}`}>
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
                                    </rect>
                                    </g><g transform="rotate(60 50 50)">
                                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`${themeColor[theme].rgb}`}>
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
                                    </rect>
                                    </g><g transform="rotate(90 50 50)">
                                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`${themeColor[theme].rgb}`}>
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
                                    </rect>
                                    </g><g transform="rotate(120 50 50)">
                                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`${themeColor[theme].rgb}`}>
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
                                    </rect>
                                    </g><g transform="rotate(150 50 50)">
                                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`${themeColor[theme].rgb}`}>
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
                                    </rect>
                                    </g><g transform="rotate(180 50 50)">
                                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`${themeColor[theme].rgb}`}>
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
                                    </rect>
                                    </g><g transform="rotate(210 50 50)">
                                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`${themeColor[theme].rgb}`}>
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
                                    </rect>
                                    </g><g transform="rotate(240 50 50)">
                                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`${themeColor[theme].rgb}`}>
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
                                    </rect>
                                    </g><g transform="rotate(270 50 50)">
                                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`${themeColor[theme].rgb}`}>
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
                                    </rect>
                                    </g><g transform="rotate(300 50 50)">
                                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`${themeColor[theme].rgb}`}>
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
                                    </rect>
                                    </g><g transform="rotate(330 50 50)">
                                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`${themeColor[theme].rgb}`}>
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
                                    </rect>
                                </g>
                            </svg>
                        </div>
                    </div>}
            <div className={`${themeColor[theme].back} p-5 text-black text-sm md:text-xl xl:text-2xl flex justify-between`}>
                <h3 className="font-extrabold">국내.외 택배조회 시스템</h3>
                <div>
                    <span>테마 : </span>
                    {buttons.map((e, i) => {
            return (<button key={i} className="mx-1 md:mx-2 xl:mx-3" onClick={() => setTheme(e.theme)}>{e.name}</button>);
        })}
                </div>
            </div>
            <div className="w-4/5 md:w-3/5 xl:w-4/12 mx-auto my-40 flex rounded items-center pt-2 flex-wrap">
                <div className="border-b basis-full py-2 px-2 flex justify-center items-center text-sm">
                    <span className="basis-[30%] text-center mr-5">국내 / 국외 선택</span>
                    <button className={`text-sm border p-1 px-5 rounded hover:text-white mr-4 ${isBtn === 1 ? 'text-white' : 'text-black'} ${themeColor[theme].hover} ${isBtn === 1 && themeColor[theme].active}`} onClick={() => { selectCode(1, '04', 'CJ대한통운'); }}>국내</button>
                    <button className={`text-sm border p-1 px-5 rounded hover:text-white ${isBtn === 2 ? 'text-white' : 'text-black'} ${themeColor[theme].hover} ${isBtn === 2 ? themeColor[theme].active : ''}`} onClick={() => { selectCode(2, '12', 'EMS'); }}>국외</button>
                </div>
                <div className="basis-full py-4 border-b">
                    {tcode}{tname}
                    <select className="w-full border p-2 rounded-md" value={tcode} onChange={(e) => {
            const result_code = e.target.value;
            setTcode(e.target.value);
            const result = carriers.find((e) => e.Code === result_code);
            if (result) {
                setTname(result.Name);
            }
        }}>
                        {carriers.map((e, i) => {
            return (<option key={i} value={e.Code}>{e.Name}</option>);
        })}
                    </select>
                </div>
                {tinvoice}
                <div className="basis-full border-b py-4 text-center">
                    <input type="text" onInput={blindNumber} placeholder="운송장 번호를 입력해주세요." className={`w-full border px-5 py-2 rounded-md ${themeColor[theme].outline}`}/>
                </div>
                <div className="basis-full border-b py-4 text-center">
                    <button className={`${themeColor[theme].back} text-white py-2 rounded-md w-full`} onClick={PostSubmit}>조회하기</button>
                </div>
                {error &&
            <div className="basis-full text-center py-4 border-b">
                        <span className={`${themeColor[theme].text}`}>{error}</span>
                    </div>}
            </div>
            {isShow &&
            <>
                    <div className="w-full">
                        <div className={`${themeColor[theme].back} text-white flex justify-center py-10 px-5 flex-wrap items-center text-center`}>
                            <span className="text-xl basis-[45%] font-bold mr-5 mb-5">운송장번호</span>
                            <h3 className="text-2xl basis-[45%] font-bold mb-5">{tinvoice}</h3>
                            <span className="text-xl basis-[45%] font-bold mr-5 mb-5">택배사</span>
                            <h3 className="text-2xl basis-[45%] font-bold mb-5">{tname}</h3>
                        </div>
                    </div>
                    <div className="bg-white my-5 flex justify-around py-5 relative before:absolute before:bg-[#e2e5e8] before:h-0.5 before:box-border before:top-[45%] before:left-[10%] before:w-4/5 before:z-0">
                        {Array(5).fill('').map((_, i) => {
                    const resultLevel = infoTracking && i + 1 === ((infoTracking === null || infoTracking === void 0 ? void 0 : infoTracking.level) - 1);
                    return (<div key={i} className={`${resultLevel ? themeColor[theme].after : 'after:bg-gray-200'} relative z-10 after:absolute after:w-[60px] after:h-[60px] after:rounded-full after:left-0 after:top-0`}>
                                        <img className="relative z-10" src={`images/ic_sky_delivery_step${i + 1}_on.png`} alt={PostListName[i]}/>
                                        <p className="text-center text-xs mt-1">{PostListName[i]}</p>
                                    </div>);
                })}
                    </div>
                    <div className="bg-white py-5">
                        {infoTracking && infoTracking.trackingDetails.slice().reverse().map((e, i) => {
                    return (<div className={`pl-20 py-5 relative group ${themeColor[theme].odd}`} key={i}>
                                        <div className={`${i === 0 ? `${themeColor[theme].back} ${themeColor[theme].border} relative border-2 rounded-full w-2 h-2 -left-[30px] top-10 z-30` : 'bg-white'}`}></div>
                                        <p>{e.where} | {e.kind}</p>
                                        <p>{e.telno}</p>
                                        <p>{e.timeString}</p>
                                        <div className={`group-last:h-0 h-full absolute w-0.5 left-[53px] top-[60px] z-20 ${themeColor[theme].back}`}></div>
                                    </div>);
                })}
                    </div>
                </>}
        </>);
}
export default App;
