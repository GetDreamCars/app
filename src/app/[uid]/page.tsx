import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
// import CarDetails from '@/components/CarDetails/CarDetails';

export default async function CarDetailsPage({ params }: { params: { uid: string } }) {
  const supabase = createServerComponentClient({ cookies });
  
  try {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('uid', params.uid)
      .single();

    if (error) throw error;
    return <div>{data.title}</div>

    // return <CarDetails car={data} error={null} />;
  } catch (err) {
    console.error('Error fetching car details:', err);
    return <div>Error fetching car details</div>
    // return <CarDetails car={null} error="Failed to load car details" />;
  }
}
