import { useState, useRef, useEffect } from "react";
// types
import type { ComponentType } from "react";
import type { IFieldType } from "@/types/store/slice/login";
import type { IFileState } from "@/components/common/user-profile/upload-profile-modal";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import {
  validationErrorList,
  updateProfileApi,
  resetValidationError,
} from "@/store/slice/login.slice";
import { showProfileUploadModal } from "@/store/slice/common.slice";

type IBaseProps = {
  show_profile_upload_modal: boolean;
  file_state: IFileState;
  tab_index: 0 | 1;
  updateTabIndex: (index: 0 | 1) => void;
  error: string;
  updateProfile: () => void;
  updateActiveField: (type: IFieldType) => void;
  profileOnClickHandler: (file_state: IFileState, file: File) => void;
};

const withLoginFunctionality = (BaseComponent: ComponentType<IBaseProps>) => {
  const EnhancedComponent = () => {
    const dispatch = useAppDispatch();
    const show_profile_upload_modal = useAppSelector(showProfileUploadModal);
    const [file_state, setFileState] = useState<IFileState>({
      state: 0, // 0 => empty; 1 => loading; 2 => done;
      file: "",
    });
    const [tab_index, setTabIndex] = useState<0 | 1>(0); // 0 => Signup, 1 => SignIn
    const file_ref = useRef<File>();
    const [active_field, setActiveField] = useState<IFieldType>(null);
    const error = useAppSelector(validationErrorList).filter(
      (error) => error.type == active_field
    )[0]?.error;

    const updateProfile = () => {
      if (file_ref.current) {
        const form_data = new FormData();
        form_data.append("avatar", file_ref.current);
        dispatch(updateProfileApi({ form_data: form_data }));
      }
    };
    const profileOnClickHandler = (file_state: IFileState, file: File) => {
      setFileState(file_state);
      file_ref.current = file;
    };
    useEffect(() => {
      dispatch(resetValidationError());
    }, [tab_index]);
    return (
      <BaseComponent
        show_profile_upload_modal={show_profile_upload_modal}
        file_state={file_state}
        tab_index={tab_index}
        updateTabIndex={(index) => setTabIndex(index)}
        error={error}
        updateProfile={updateProfile}
        updateActiveField={(type) => setActiveField(type)}
        profileOnClickHandler={profileOnClickHandler}
      />
    );
  };
  return EnhancedComponent;
};

export default withLoginFunctionality;
