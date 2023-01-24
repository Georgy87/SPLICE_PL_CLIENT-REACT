import { Suspense } from 'react';

import { Loader } from '@components/Kit/Loader';

export default function withSuspense<P>(Component: React.ComponentType & any) {
    return function WithSuspense(props: P) {
        return (
            <Suspense fallback={<Loader />}>
                <Component {...props} />
            </Suspense>
        );
    };
}
