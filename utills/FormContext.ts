// FormContext.tsx
import React, { createContext, useContext, useState, ReactNode, FC } from 'react';

interface FormDataType {
  name: string;
  phone: string;
  email: string;
  // 기타 필드들...
}

// 값을 `null`로 설정하기 전에 기본적인 형태를 제공합니다.
const defaultFormData: FormDataType = {
  name: '',
  phone: '',
  email: '',
  // 기타 필드들...
};

const FormContext = createContext<{
  formData: FormDataType;
  updateFormData: (field: keyof FormDataType, value: string) => void;
}>({
  formData: defaultFormData, // 초기 상태
  updateFormData: () => { }, // 빈 함수
});

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
}

// export const FormProvider: FC<FormProviderProps> = ({ children }) => {
//   const [formData, setFormData] = useState<FormDataType>(defaultFormData);

//   const updateFormData = (field: keyof FormDataType, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   // 리턴이안됌. 월욜날 와서 확인할것 

//   return (
//     <FormContext.Provider>
//       {children}
//     </FormContext.Provider>
//   );
// };
