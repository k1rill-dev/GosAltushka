import React, {useState} from 'react';

const ConfirmationModal = ({message, onConfirm, onCancel}) => {
    const [isOpen, setIsOpen] = useState(false);
    let [address, setAddress] = useState('');

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleChange = (event) => {
        setAddress(event.target.value)
    };

    const handleConfirm = () => {
        onConfirm(address);
        closeModal();
    };

    return (
        <div>
            <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded">
                Хочу эту альтушку!
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 p-4">
                    <div className="mx-auto rounded-lg shadow bg-white max-w-sm">
                        <div className="p-4">
                            <p className="text-lg font-medium">{message}</p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-sm font-medium mb-2">
                                Введите адрес доставки альтушки
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full rounded-md border border-gray-300 py-2 px-3"
                                value={address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button onClick={closeModal}
                                    className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md border border-gray-300">
                                Отмена
                            </button>
                            <button onClick={handleConfirm} className="bg-red-500 text-white px-4 py-2 rounded-md">
                                Подтвердить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConfirmationModal;
