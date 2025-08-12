import { Outlet } from 'react-router'
import PublicFooter from '~/components/shared/public-footer'
import PublicHeader from '~/components/shared/public-header'

export default function PublicLayout() {
  return (
    <>
      <PublicHeader />
      <div className="container mx-auto px-4 py-8">
        <Outlet />
      </div>
      <PublicFooter />
    </>
  )
}
