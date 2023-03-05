import { useCallback } from "react";

type HandlersType = {
  [status: number | string]: any;
};

export const useApiError = (handlers?: HandlersType) => {
  const handle400 = () => {
    alert("잘못된 요청입니다.");
  };
  const handle401 = () => {
    alert("다시 로그인해주세요.");
  };

  const handle403 = () => {
    alert("권한이 없습니다.");
  };

  const handle404 = () => {
    alert("값을 다시 확인해주세요.");
  };

  const handle500 = () => {
    alert("서버 및 동아리에 문의해주세요.");
  };

  const handleDefault = () => {
    alert("네트워크 상태를 확인해주세요.");
  };

  // 기본적으로 처리될 수 있는 에러 핸들러
  const defaultHandlers: HandlersType = {
    400: {
      default: handle400,
    },
    401: {
      default: handle401,
    },
    403: {
      default: handle403,
    },
    404: {
      default: handle404,
    },
    500: {
      default: handle500,
    },
    default: handleDefault,
  };

  const handleError = useCallback(
    (error: any) => {
      const httpStatus = error.result;
      const errorMessage = error.data?.errorMessage;

      switch (true) {
        case handlers && !!handlers[httpStatus]?.[errorMessage]:
          handlers![httpStatus][errorMessage]();
          break;

        case handlers && !!handlers[httpStatus]:
          handlers![httpStatus](error);
          break;

        case handlers && !!handlers[httpStatus]:
          handlers![httpStatus].default(error);
          break;

        case !!defaultHandlers[httpStatus]:
          defaultHandlers[httpStatus]();
          break;

        case !!defaultHandlers[httpStatus]:
          defaultHandlers[httpStatus].default();
          break;

        default:
          defaultHandlers.default();
      }
    },
    [handlers]
  );

  return { handleError };
};
