export default function Card({title, children, className=''}){
  return (
    <div className={`bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-700 ${className} transition-transform hover:scale-[1.01]`}>
      <h3 className="text-sm font-medium text-gray-200 mb-2">{title}</h3>
      <div className="text-sm text-gray-300">{children}</div>
    </div>
  )
}
