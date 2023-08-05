import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {
  const [orderStats, setOrderStats] = useState([]);
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [sPerc, setSPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        if (res.data !== []) {
          setIncome(res.data);
          setPerc((res.data[1].total * 100) / res.data[0].total - 100);
        }
      } catch {}
    };
    getIncome();
  }, []);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders/stats");
        console.log(res);
        if (res.data !== []) {
          setOrderStats(res.data);
          setSPerc((res.data[1].total * 100) / res.data[0].total - 100);
        }
      } catch {}
    };
    getOrders();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{income[1]?.total} ksh</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>

        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Orders</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{income[1]?.count}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(sPerc)}
            {sPerc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
