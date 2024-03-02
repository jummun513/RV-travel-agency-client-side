import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select';

const PackageSearch = () => {
    const [formData, setFormData] = useState({
        searchPackage: '',
        searchCity: '',
        searchPackageType: '',
    });
    const navigate = useNavigate();
    const location = useLocation();
    const packageName = new URLSearchParams(location.search)?.get('name');
    const city = new URLSearchParams(location.search)?.get('city');
    const type = new URLSearchParams(location.search)?.get('type');

    // set input value according their name
    const handleInputChange = (field, e) => {
        let value;
        if (field === 'searchPackageType') {
            value = e;
        }
        else {
            value = e.target.value;
        }
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    // search form submit
    const formSubmit = (e) => {
        e.preventDefault();
        if (formData.searchPackage.trim() !== '') {
            navigate(`/package-tours?name=${formData.searchPackage.trim()}${formData.searchCity.trim() !== '' ? `&city=${formData.searchCity.trim()}` : ''}${formData.searchPackageType !== '' ? `&type=${formData.searchPackageType?.value}` : ''}`);
        }
        if (formData.searchPackage.trim() === '' && formData.searchCity.trim() !== '') {
            navigate(`/package-tours?city=${formData.searchCity.trim()}${formData.searchPackageType !== '' ? `&type=${formData.searchPackageType.value}` : ''}`);
        }
        else if (formData.searchPackage.trim() === '' && formData.searchCity.trim() === '' && formData.searchPackageType !== '') {
            navigate(`/package-tours?type=${formData.searchPackageType?.value}`);
        }
        else {
            navigate(`/package-tours?name=${formData.searchPackage.trim()}${formData.searchCity.trim() !== '' ? `&city=${formData.searchCity.trim()}` : ''}${formData.searchPackageType !== '' ? `&type=${formData.searchPackageType?.value}` : ''}`);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            formSubmit(e);
        }
    };

    // option for relation select dropdown
    const options = [
        { value: 'Honeymoon Tour Package', label: 'Honeymoon Tour' },
        { value: 'Holiday Tour Package', label: 'Holiday Tour' },
        { value: 'Summer Tour Package', label: 'Summer Tour' },
        { value: 'World Tour Package', label: 'World Tour' },
        { value: 'Independent Tour Package', label: 'Independent Tour' },
        { value: 'Business Tour Package', label: 'Business Tour' },
        { value: 'Refreshment Tour Package', label: 'Refreshment Tour' },
        { value: 'Vacation Tour Package', label: 'Vacation Tour' },
        { value: 'Family Tour Package', label: 'Family Tour' },
        { value: 'Corporate Tour Package', label: 'Corporate Tour' },
        { value: 'Holy Hajj Package', label: 'Hajj Package' },
        { value: 'Holy Umrah Package', label: 'Umrah Package' },
        { value: 'Student tour Package', label: 'Student Tour' },
        { value: 'Study Package', label: 'Study Package' },
    ];

    const valueType = options.find(d => d.value === type);

    const customStyles = {
        control: baseStyles => ({
            ...baseStyles,
            textAlign: 'start',
            height: '100%',
            minHeight: '100%',
        }),
    };


    return (
        <div>
            <form className='p-1 xxs:px-5 py-10 flex flex-col items-center' onSubmit={formSubmit}>
                <div className='grid grid-cols-1 gap-y-5 xl:gap-y-0 xl:grid-cols-3 xl:gap-x-5'>
                    {/* search via package name or city or country */}
                    <div className='border-2 border-gray-300 px-4 py-2 rounded-md'>
                        <div className="form-control w-full max-w-xs">
                            <label htmlFor="" className="label">
                                <span className="label-text 2xl:text-base font-semibold text-gray-900">Enter Package Name</span>
                            </label>
                            <input defaultValue={packageName || ''} onKeyDown={handleKeyDown} onChange={(e) => handleInputChange('searchPackage', e)} type="text" placeholder="Search Package" className="input input-bordered input-info input-sm 2xl:input-md w-full min-w-[100px] text-gray-950 bg-white" />
                            <label className="label">
                                <span style={{ textAlign: 'center' }} className="label-text-alt text-gray-800">Select a Package</span>
                            </label>
                        </div>
                    </div>

                    {/* search via city or country */}
                    <div className='border-2 border-gray-300 px-4 py-2 rounded-md'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text 2xl:text-base font-semibold text-gray-900">Enter City or Country</span>
                            </label>
                            <input defaultValue={city || ''} onKeyDown={handleKeyDown} onChange={(e) => handleInputChange('searchCity', e)} type="text" placeholder="Search City" className="input input-bordered input-info input-sm 2xl:input-md w-full min-w-[100px] text-gray-950 bg-white" />
                            <label className="label">
                                <span className="label-text-alt text-gray-800">Select a City</span>
                            </label>
                        </div>
                    </div>

                    {/* search via package type */}
                    <div className='border-2 border-gray-300 px-4 py-2 rounded-md'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text 2xl:text-base font-semibold text-gray-900">Package Type</span>
                            </label>
                            <Select defaultValue={valueType || ''} onKeyDown={handleKeyDown} onChange={(e) => handleInputChange('searchPackageType', e)} styles={customStyles} isClearable={true} className="h-8 2xl:h-12 text-gray-700 text-sm 2xl:text-base" options={options} />
                            <label className="label">
                                <span className="label-text-alt text-gray-800">Select a City</span>
                            </label>
                        </div>
                    </div>
                </div>
                <input type="submit" value="Search" className='btn xs:btn-wide mt-10 text-gray-950 btn-sm md:btn-md bg-primary border-none hover:bg-secondary' />
            </form>
        </div>
    );
};

export default PackageSearch;