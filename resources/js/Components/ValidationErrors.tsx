import React from 'react';

interface Errors {
  errors: Record<string, string>
}

const ValidationErrors: React.FC<Errors> = (props) => {
  console.log(props.errors)
  const { errors } = props
  const error = errors.captcha || errors.password || errors.email || errors.token || errors.password_confirmation
    return (
        <div>
        {Object.keys(props.errors).length > 0 &&
            <div className="mb-4">
                <div className="font-medium text-red-600">Whoops! Something went wrong.</div>

                <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                    {Object.keys(props.errors).map(function (_, index) {
                        return <li key={index}>{error}</li>;
                    })}
                </ul>
            </div>
        }
        </div>
    )
}

export default ValidationErrors
