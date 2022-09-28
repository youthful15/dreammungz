import React, { useRef } from "react"

// const [isOpen, setOpen] = useState(false)
// const modalClose = () => setOpen(false)
// isOpen과 modalClose를 함께 넘겨주세요.
interface ModalProps {
  isOpen: boolean
  modalClose: any
  children: any
}

export default function SpinnerModal({
  isOpen,
  modalClose,
  children,
}: ModalProps) {
  const outModal = useRef<HTMLInputElement>(null)

  const showHide = isOpen ? "visible z-50" : "hidden z-10"

  return (
    <div
      className={showHide}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        onClick={(event) => {
          if (event.target === outModal.current) {
            modalClose()
          }
        }}
      >
        <div
          className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
          ref={outModal}
        >
          <div className="relative  rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="p-6 flex justify-center items-center">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
