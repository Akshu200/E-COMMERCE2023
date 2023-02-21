import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import Spin from "../../components/spin/Spin";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {loading ? (
              <Spin />
            ) : (
              <>
                {orders?.map((o, i) => {
                  return (
                    <div className="border shadow m-4 p-3">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Order Id</th>
                            <th scope="col">Status</th>
                            <th scope="col">Buyer</th>
                            <th scope="col"> date</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{i + 1}</td>
                            <td>{o?.payment.transaction?.id}</td>
                            <td>
                              <h5 className="btn btn-info">{o?.status}</h5>
                            </td>
                            <td>
                              <h5> {o?.buyer?.name}</h5>
                            </td>
                            <td>{o?.createdAt}</td>
                            <td>
                              {o?.payment.success ? (
                                <h3 className="btn btn-success">Success</h3>
                              ) : (
                                <h3 className="btn btn-danger">Failed</h3>
                              )}
                            </td>
                            <td>{o?.products?.length}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="container">
                        {loading ? (
                          <Spin />
                        ) : (
                          <>
                            {o?.products?.map((p, i) => (
                              <div
                                className="row mb-2 p-3 card flex-row"
                                key={p._id}
                              >
                                <div className="col-md-4">
                                  {loading ? (
                                    <Spin />
                                  ) : (
                                    <>
                                      <img
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        width="100px"
                                        height={"200px"}
                                      />
                                    </>
                                  )}
                                </div>
                                <div className="col-md-8">
                                  <p>{p.name}</p>
                                  <p>{p.description.substring(0, 30)}</p>
                                  <p>Price : {p.price}</p>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
