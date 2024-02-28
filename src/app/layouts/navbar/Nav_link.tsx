import { useSelector } from "react-redux";
import ContentTooltip from "./ContentTooltip";
import styled from "styled-components";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import Link from "next/link";

const Nav_link = React.memo(() => {
  const auth = useSelector((state: RootState) => state.auth);

  const { user } = auth;
  const isAuthenticated = auth.isAuthenticated;

  console.log("isAuthenticated", isAuthenticated);
  console.log("user", user);

  return (
    <>
      <div className="flex gap-1">
        {/* account */}
        <StyledToolTip>
          {/* account container */}
          <div className="flex cursor-pointer hover:">
            {/* avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden"></div>

            {/* username */}
            <div
              className="flex items-center text-white outline-none
            text-xl font-medium p-1
            "
            >
              {isAuthenticated ? (
                <div
                  className="text-white outline-none
            text-xl font-medium p-1
            "
                >
                  <span>{user?.fullName}</span>
                </div>
              ) : (
                <div
                  className="text-white outline-none
            text-xl font-medium p-1
            "
                >
                  <Link href="/login">Đăng nhập</Link>
                  <span className="mx-2">/</span>
                  <Link href="/register">Đăng ký</Link>
                </div>
              )}
            </div>
          </div>
          {/* <Tooltip /> */}
          <div className="tooltipContent flex invisible ">
            <div className="w-0 h-0 relative ">
              {isAuthenticated ? <ContentTooltip /> : null}
            </div>
          </div>
        </StyledToolTip>
      </div>
    </>
  );
});

const StyledToolTip = styled.div`
  display: block;
  position: relative;
  padding-top: 0.5rem;
  &:hover .tooltipContent {
    visibility: visible;
  }
`;

export default Nav_link;
