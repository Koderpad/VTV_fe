"use client";
import { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header_v1 from "./layouts/headers/Header_v1";
import Banner from "./layouts/banner/Banner";
import { useRouter } from "next/navigation.js";
import Link from "next/link";

interface Category {
  categoryId: number;
  name: string;
  image: string;
  description?: string;
  adminOnly?: boolean;
  status: string;
}

interface getAllParentRes {
  status: string;
  message: string;
  code: number;
  categoryAdminDTOs: Category[];
}

const slickSettings = {
  slidesToShow: 10,
  slidesToScroll: 1,
  infinite: true,
  dots: false,
  arrows: false, // Disable default arrows
};
const Home = () => {
  const [categorySlider, setCategorySlider] = useState<Slider | null>(null);
  const [categoryItems, setCategoryItems] = useState<Category[]>([]);
  // const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:8181/api/vendor/shop/category/all-parent",
          {
            method: "GET",
          }
        );

        if (res) {
          const data: getAllParentRes = await res.json();
          console.log(data);
          setCategoryItems(data.categoryAdminDTOs);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Initialize Slick Carousel for category items
    if (categorySlider) {
      categorySlider.slickGoTo(0); // Go to the first slide initially
    }
  }, [categorySlider]);

  const handleNext = () => {
    if (categorySlider) {
      categorySlider.slickNext();
    }
  };

  const handlePrev = () => {
    if (categorySlider) {
      categorySlider.slickPrev();
    }
  };

  return (
    <div className="bg-gray-100">
      {/* Header (Your existing code) */}
      <Header_v1 />

      <div className="px-60 py-10 space-y-5">
        <div className="  sm:mx-4 md:mx-16 ">
          {/* Banner Carousel */}
          <Banner />
          {/* Category Form */}
          <div className="shadow-md bg-white p-4 space-y-4 w-full">
            <h2 className="text-2xl  font-bold mb-4 ">DANH MỤC</h2>
            <div className="w-full h-full relative flex items-center flex-wrap gap-2">
              {categoryItems.map((category, index) => (
                <ItemCategory key={index} data={category} />
              ))}
            </div>
          </div>
        </div>
        <div className="container-fluid mt-8 mx-8 sm:mx-4 md:mx-16 drop-shadow-md">
          <div className="bg-white  mt-4 border-double  drop-shadow-md">
            <ProductListFix />
          </div>
        </div>
      </div>
      {/* Content Section */}

      {/* Footer (Your existing code) */}
      <footer className="bg-gray-800 text-white py-4 mt-4">
        {/* Your footer content goes here */}
      </footer>
    </div>
  );
};

const ItemCategory = (props: { data: Category }) => {
  const router = useRouter();
  const handleCategoryClick = () => {
    router.push(`/products/${props.data.categoryId}`);
  };
  return (
    <div className="p-2 border border-transparent hover:border hover:border-gray-600">
      <div
        className="flex flex-col items-center hover:cursor-pointer"
        onClick={handleCategoryClick}
      >
        <img
          src={props.data.image}
          alt={props.data.name}
          className="w-40 h-40 object-cover mb-2"
        />
        <span className="text-xl text-center font-light">
          {props.data.name}
        </span>
      </div>
    </div>
  );
};

// ----------------------------------------
// Path: src/features/common/products/components/ProductsList/ProductListFix.tsx

// ("use client");
// import { Link } from "react-router-dom";
// import { useCallback, useEffect, useState } from "react";
import { useGetProductPageListQuery } from "@/redux/features/products/productsPageGetApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
interface ListProductPageResponse {
  status: string;
  message: string;
  code: number;
  count: number;
  size: number;
  page: number;
  totalPage: number;
  productDTOs: ProductDTO[];
}

interface ProductDTO {
  productId: number;
  name: string;
  image: string;
  description: string;
  information: string;
  sold: number;
  status: string;
  categoryId: number;
  brandId: number | null;
  productVariantDTOs: ProductVariantDTO[];
}

interface ProductVariantDTO {
  productVariantId: number;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  status: string;
  productId: number;
  attributeDTOs: AttributeDTO[];
}

interface AttributeDTO {
  attributeId: number;
  name: string;
  value: string;
  active: boolean;
  shopId: number;
}

const ProductListFix = React.memo(
  () => {
    const [page, setPage] = useState(1);
    const size = 8;
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [productPageResponse, setProductPageResponse] =
      useState<ListProductPageResponse | null>(null);

    const { data, error, isLoading, refetch } = useGetProductPageListQuery({
      page,
      size,
    });

    console.log("data", data);

    const fetchData = useCallback(async () => {
      console.log("1");
      try {
        if (data) {
          //   console.log("responseData", responseData);
          setProductPageResponse(data || null);
          setProducts(data.productDTOs || []);
          toast.success("Lấy dữ liệu thành công !!");
        } else {
          toast.error("Invalid response data", data.message);
        }
      } catch (error) {
        toast.error("Error fetching data");
      }
    }, [data]);

    useEffect(() => {
      fetchData();
      console.log("2");
    }, [fetchData]);

    if (!data) {
      return null;
    }

    const handlePageClick = (pageNumber: number) => {
      setPage(pageNumber);
    };
    const renderPageButtons = () => {
      if (!productPageResponse) {
        return null;
      }

      const totalPage = productPageResponse.totalPage;
      const currentPage = page;

      const visiblePages = 5; // Number of pages to display around the current page
      const halfVisiblePages = Math.floor(visiblePages / 2);

      let startPage = Math.max(1, currentPage - halfVisiblePages);
      let endPage = Math.min(totalPage, startPage + visiblePages - 1);

      // Adjust startPage and endPage to always display visiblePages number of buttons
      if (endPage - startPage + 1 < visiblePages) {
        startPage = Math.max(1, endPage - visiblePages + 1);
      }

      const pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
      );

      return (
        <div className="flex space-x-2 justify-center">
          {startPage > 1 && (
            <button
              className={`px-3 py-2 bg-gray-200 rounded-md`}
              onClick={() => handlePageClick(1)}
            >
              1
            </button>
          )}
          {startPage > 2 && <span className="px-3 py-2">...</span>}
          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-3 py-2 ${
                pageNumber === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } rounded-md`}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          {endPage < totalPage - 1 && <span className="px-3 py-2">...</span>}
          {endPage < totalPage && (
            <button
              className={`px-3 py-2 bg-gray-200 rounded-md`}
              onClick={() => handlePageClick(totalPage)}
            >
              {totalPage}
            </button>
          )}
        </div>
      );
    };

    return (
      <>
        <section className="bg-gray-50 font-poppins  ">
          <div className="px-4 py-4 mx-auto lg:py-6 md:px-6">
            <div className="flex flex-wrap mb-24 -mx-3">
              {/* filter */}

              {/* products */}
              <div className="w-full px-3 lg:w-5/6">
                {/* sort products */}

                {/* grid */}
                <span className="text-[20px]">Danh sách sản phẩm mới</span>
                <div className="grid grid-cols-4 gap-4 ">
                  {products.map((product: ProductDTO) => (
                    <div
                      key={product.productId}
                      className="w-auto px-3 mb-6 sm:w-1/2 md:w-full"
                    >
                      <div className="border border-gray-300 dark:border-gray-700">
                        <div className="relative bg-gray-200">
                          <Link
                            href={`/product/${product.productId}`}
                            className=""
                          >
                            <img
                              src={product.image}
                              alt=""
                              className="object-fill w-full h-60 "
                            />
                          </Link>
                        </div>
                        <div className="p-3 ">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <h3 className="text-xl font-medium dark:text-gray-400">
                              {product.name}
                            </h3>
                          </div>
                          <p className="text-lg ">
                            <span className="text-green-600 dark:text-green-600">
                              {product.productVariantDTOs[0].price}đ
                            </span>
                          </p>
                        </div>

                        {/* </div> */}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-4">{renderPageButtons()}</div>
              </div>
            </div>
            <ToastContainer position="bottom-right" />
          </div>
        </section>
      </>
    );
  },
  (prevProps, nextProps) => prevProps === nextProps
);

export default Home;
