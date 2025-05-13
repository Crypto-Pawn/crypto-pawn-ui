import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ethers } from 'ethers';
import { cryptoPawnCoreAbi } from '@/libs/contracts/morgage-token.ts';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/Form.tsx';
import { Button } from '@/components/ui/Button.tsx';
import { Input } from './ui/Input.tsx';

const formSchema = z.object({
  nftTokenId: z.string().min(1, 'NFT Token ID (address) is required'),
  nftContract: z.string().min(1, 'NFT Contract address is required'),
  principal: z.number().min(1, 'Principal must be greater than 0'),
  interest: z.number().min(1, 'Interest must be greater than 0'),
  duration: z.number().min(1, 'Duration must be at least 1 day'),
});

type FormCreateLoanInputs = z.infer<typeof formSchema>;

const FormCreateLoan: React.FunctionComponent<{ closeDialog: () => void }> = ({ closeDialog }) => {
  const form = useForm<FormCreateLoanInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nftTokenId: '',
      nftContract: '',
      principal: 0,
      interest: 0,
      duration: 0,
    },
  });

  const onSubmit: SubmitHandler<FormCreateLoanInputs> = async data => {
    try {
      // Connect to Ethereum provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Contract instance
      const contractAddress = '0xYourContractAddressHere'; // Replace with your contract address
      const contract = new ethers.Contract(contractAddress, cryptoPawnCoreAbi, signer);

      // Call createOffer function
      const tx = await contract.createOffer(
        data.nftTokenId,
        data.nftContract,
        ethers.parseEther(data.principal.toString()),
        ethers.parseEther(data.interest.toString()),
        data.duration
      );

      // Wait for transaction to be mined
      await tx.wait();

      console.log('Offer created successfully:', tx);
      closeDialog();
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* NFT Token ID Field */}
        <FormField
          control={form.control}
          name="nftTokenId"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>NFT Token ID (Address)</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* NFT Contract Address Field */}
        <FormField
          control={form.control}
          name="nftContract"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>NFT Contract Address</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Principal Field */}
        <FormField
          control={form.control}
          name="principal"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Principal (ETH)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Interest Field */}
        <FormField
          control={form.control}
          name="interest"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Interest (ETH)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration Field */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Duration (in days)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="destructive" onClick={closeDialog}>
            Cancel
          </Button>
          <Button type="submit" variant="purple">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormCreateLoan;